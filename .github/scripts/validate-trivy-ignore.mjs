import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MAX_EXCEPTION_DAYS = 90;
const ROOT_FIELDS = new Set(['vulnerabilities']);
const EXCEPTION_FIELDS = new Set(['id', 'purls', 'expired_at', 'statement']);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isVersionedPurl(value) {
  if (typeof value !== 'string' || value.trim() !== value || !value.startsWith('pkg:')) return false;
  const packagePart = value.split(/[?#]/, 1)[0];
  const versionSeparator = packagePart.lastIndexOf('@');
  if (versionSeparator <= packagePart.lastIndexOf('/')) return false;

  try {
    const version = decodeURIComponent(packagePart.slice(versionSeparator + 1));
    return version !== '' && !/^(latest|next)$/i.test(version) && !/[\s*<>=^~|,]/.test(version);
  } catch {
    return false;
  }
}

function parseIsoDate(value, field) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(value), `${field} must use YYYY-MM-DD.`);
  const date = new Date(`${value}T00:00:00.000Z`);
  assert(!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value, `${field} is not a valid date.`);
  return date;
}

export function validatePolicy(policy, now = new Date()) {
  assert(policy && typeof policy === 'object' && !Array.isArray(policy), 'Policy must be an object.');
  for (const field of Object.keys(policy)) {
    assert(ROOT_FIELDS.has(field), `Unsupported root field: ${field}.`);
  }
  assert(Array.isArray(policy.vulnerabilities), 'Policy must contain a vulnerabilities array.');

  const seenIds = new Set();
  for (const [index, exception] of policy.vulnerabilities.entries()) {
    const prefix = `vulnerabilities[${index}]`;
    assert(exception && typeof exception === 'object' && !Array.isArray(exception), `${prefix} must be an object.`);
    for (const field of Object.keys(exception)) {
      assert(EXCEPTION_FIELDS.has(field), `${prefix} has unsupported field ${field}.`);
    }

    assert(typeof exception.id === 'string' && exception.id.trim() !== '', `${prefix}.id is required.`);
    assert(!seenIds.has(exception.id), `${prefix}.id duplicates ${exception.id}.`);
    seenIds.add(exception.id);

    assert(Array.isArray(exception.purls) && exception.purls.length > 0, `${prefix}.purls must scope the exception.`);
    assert(exception.purls.every(isVersionedPurl), `${prefix}.purls must contain only versioned package URLs.`);
    assert(new Set(exception.purls).size === exception.purls.length, `${prefix}.purls contains duplicates.`);

    assert(
      typeof exception.statement === 'string' &&
        exception.statement.length >= 40 &&
        /\bowner\s*:/i.test(exception.statement) &&
        /\brationale\s*:/i.test(exception.statement) &&
        /\bremediation\s*:/i.test(exception.statement),
      `${prefix}.statement must include owner, rationale, and remediation.`
    );

    const expiresAt = parseIsoDate(exception.expired_at, `${prefix}.expired_at`);
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    assert(expiresAt > today, `${prefix} is expired.`);
    assert(
      expiresAt.getTime() - today.getTime() <= MAX_EXCEPTION_DAYS * 24 * 60 * 60 * 1_000,
      `${prefix} expires more than ${MAX_EXCEPTION_DAYS} days from now.`
    );
  }

  return policy.vulnerabilities.length;
}

export function readAndValidatePolicy(file, now) {
  const policy = JSON.parse(fs.readFileSync(file, 'utf8'));
  return validatePolicy(policy, now);
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const file = path.resolve(process.argv[2] || '.trivyignore.yaml');
  try {
    const count = readAndValidatePolicy(file);
    console.log(`Validated ${count} temporary Trivy exception(s) in ${path.relative(process.cwd(), file)}.`);
  } catch (error) {
    console.error(`Invalid Trivy exception policy: ${error.message}`);
    process.exitCode = 1;
  }
}
