import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const REQUIRED_TOOLS = ['find-component', 'get-component', 'get-design-tokens', 'list-components'];

async function waitForHealth(baseUrl, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/healthz`, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) return response.json();
      lastError = new Error(`Health check returned ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not become healthy within ${timeoutMs} ms.`, { cause: lastError });
}

export async function runSmokeTest(inputUrl, { checkStyleguide = true } = {}) {
  const baseUrl = inputUrl.replace(/\/+$/, '');
  const health = await waitForHealth(baseUrl);
  assert.equal(health.ok, true);
  assert.ok(Number.isInteger(health.components) && health.components > 0);

  if (checkStyleguide) {
    const styleguide = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(5_000) });
    assert.equal(styleguide.status, 200, 'Storybook root must be served by the runtime image.');
    assert.match(await styleguide.text(), /<!doctype html/i);
  }

  const transport = new StreamableHTTPClientTransport(new URL(`${baseUrl}/mcp`));
  const client = new Client({ name: '@sk-web-gui/mcp-smoke-test', version: '1.0.0' });
  try {
    await client.connect(transport);
    const toolResult = await client.listTools();
    const names = toolResult.tools.map((tool) => tool.name).sort();
    assert.deepEqual(names, REQUIRED_TOOLS);

    const callResult = await client.callTool({ name: 'list-components', arguments: {} });
    assert.notEqual(callResult.isError, true);
    assert.equal(callResult.content[0]?.type, 'text');
    const payload = JSON.parse(callResult.content[0].text);
    assert.equal(payload.count, health.components);

    for (const query of ['x'.repeat(201), Array.from({ length: 21 }, () => 'term').join(' ')]) {
      const invalidCall = await client.callTool({ name: 'find-component', arguments: { query } });
      assert.equal(invalidCall.isError, true, 'Excessive tool inputs must be rejected by the MCP schema.');
    }
  } finally {
    await client.close().catch(() => undefined);
  }

  console.log(`MCP smoke test passed for ${health.components} components at ${baseUrl}.`);
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const baseUrl = process.argv[2] || process.env.MCP_URL;
  if (!baseUrl) throw new Error('Usage: node mcp-server/smoke-test.mjs <base-url>');
  await runSmokeTest(baseUrl);
}
