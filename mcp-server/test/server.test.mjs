import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import http from 'node:http';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { runSmokeTest } from '../smoke-test.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(__dirname, '..', 'server.mjs');
const manifestPath = path.join(__dirname, 'fixtures', 'manifest.json');

let child;
let baseUrl;
let stderr = '';

before(async () => {
  child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: '0',
      MCP_ALLOWED_HOSTS: '127.0.0.1',
      MCP_MAX_IN_FLIGHT: '1',
      MCP_MANIFEST_PATH: manifestPath,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });

  baseUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Server did not start. ${stderr}`)), 10_000);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      const match = chunk.match(/MCP server on 127\.0\.0\.1:(\d+)/);
      if (match) {
        clearTimeout(timer);
        resolve(`http://127.0.0.1:${match[1]}`);
      }
    });
    child.once('exit', (code, signal) => {
      clearTimeout(timer);
      reject(new Error(`Server exited before startup (code ${code}, signal ${signal}). ${stderr}`));
    });
  });
});

after(async () => {
  if (!child || child.exitCode !== null) return;
  child.kill('SIGTERM');
  await new Promise((resolve) => child.once('exit', resolve));
});

test('serves a healthy MCP contract with defensive HTTP headers', async () => {
  const response = await fetch(`${baseUrl}/healthz`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.has('x-powered-by'), false);
  await runSmokeTest(baseUrl, { checkStyleguide: false });
});

test('rejects find-component queries over the protocol work limit', async () => {
  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`));
  const client = new Client({ name: 'query-limit-test', version: '1.0.0' });
  try {
    await client.connect(transport);
    const result = await client.callTool({
      name: 'find-component',
      arguments: { query: 'x'.repeat(201) },
    });
    assert.equal(result.isError, true);
    assert.match(result.content[0]?.text ?? '', /too_big|max|200/i);
  } finally {
    await client.close().catch(() => undefined);
  }
});

test('rejects an unapproved Host header on the MCP endpoint', async () => {
  const url = new URL(`${baseUrl}/mcp`);
  const response = await new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'GET',
        headers: { Accept: 'application/json', Host: 'attacker.example' },
      },
      resolve
    );
    request.once('error', reject);
    request.end();
  });

  response.resume();
  assert.equal(response.statusCode, 403);
  assert.equal(response.headers['x-frame-options'], 'DENY');
});

test('returns bounded JSON errors for malformed and oversized requests', async () => {
  const malformed = await fetch(`${baseUrl}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{',
  });
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), {
    jsonrpc: '2.0',
    error: { code: -32700, message: 'Invalid JSON.' },
    id: null,
  });

  const oversized = await fetch(`${baseUrl}/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: 'x'.repeat(262_144) }),
  });
  assert.equal(oversized.status, 413);
  assert.equal((await oversized.json()).error.message, 'Request body is too large.');
});

test('sheds excess concurrent MCP work and recovers after disconnect', async () => {
  const url = new URL(`${baseUrl}/mcp`);
  const holdingRequest = http.request({
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  holdingRequest.on('error', () => undefined);
  holdingRequest.flushHeaders();
  holdingRequest.write('{');

  let busyResponse;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const response = await fetch(`${baseUrl}/mcp`, { headers: { Accept: 'application/json' } });
    if (response.status === 503) {
      busyResponse = response;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  assert.equal(busyResponse?.status, 503);
  assert.equal(busyResponse.headers.get('retry-after'), '1');
  assert.equal((await busyResponse.json()).error.message, 'MCP server is busy.');
  holdingRequest.destroy();

  let recovered = false;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const response = await fetch(`${baseUrl}/mcp`, { headers: { Accept: 'application/json' } });
    if (response.status === 405) {
      recovered = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(recovered, true);
});

test('fails closed for unsafe timeout configuration', () => {
  const result = spawnSync(process.execPath, [serverPath], {
    env: {
      ...process.env,
      MCP_HEADERS_TIMEOUT_MS: '20000',
      MCP_REQUEST_TIMEOUT_MS: '10000',
      MCP_MANIFEST_PATH: manifestPath,
    },
    encoding: 'utf8',
    timeout: 5_000,
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /keep-alive < headers <= request/);
});
