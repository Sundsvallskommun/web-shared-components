import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validatePolicy } from './validate-trivy-ignore.mjs';

const NOW = new Date('2026-07-10T12:00:00Z');
const VALID_EXCEPTION = {
  id: 'CVE-2099-0001',
  purls: ['pkg:npm/example@1.2.3'],
  expired_at: '2026-08-01',
  statement: 'Owner: @security-team; rationale: code is unreachable; remediation: upgrade the base image.',
};

test('accepts an empty zero-finding policy', () => {
  assert.equal(validatePolicy({ vulnerabilities: [] }, NOW), 0);
});

test('accepts a scoped, owned, and time-limited exception', () => {
  assert.equal(validatePolicy({ vulnerabilities: [VALID_EXCEPTION] }, NOW), 1);
});

test('rejects blanket, permanent, expired, and long-lived exceptions', () => {
  assert.throws(() => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, purls: undefined }] }, NOW), /scope/);
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, purls: ['pkg:npm/example'] }] }, NOW),
    /versioned package URLs/
  );
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, purls: ['pkg:npm/example@^1.2.3'] }] }, NOW),
    /versioned package URLs/
  );
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, expired_at: undefined }] }, NOW),
    /YYYY-MM-DD/
  );
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, expired_at: '2026-02-31' }] }, NOW),
    /valid date/
  );
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, expired_at: '2026-07-01' }] }, NOW),
    /expired/
  );
  assert.throws(
    () => validatePolicy({ vulnerabilities: [{ ...VALID_EXCEPTION, expired_at: '2027-01-01' }] }, NOW),
    /more than 90 days/
  );
});
