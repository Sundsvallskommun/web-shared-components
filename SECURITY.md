# Security policy

## Supported versions

Security fixes are made on the default branch and released in the latest
published version of each `@sk-web-gui/*` package. Older package versions do not
receive backported fixes unless Sundsvalls kommun explicitly announces an
exception.

| Version                  | Supported |
| ------------------------ | --------- |
| Latest published release | Yes       |
| Older releases           | No        |

## Report a vulnerability privately

Do not open a public issue for a suspected vulnerability. Use GitHub's
[private vulnerability reporting](https://github.com/Sundsvallskommun/web-shared-components/security/advisories/new)
for this repository. If private reporting is unavailable, contact a repository
maintainer through an approved private Sundsvalls kommun channel and ask for a
secure reporting route. Do not include exploit details in a public message.

Include, when possible:

- the affected package and version or commit;
- a minimal reproduction or proof of concept;
- the expected impact and required attacker capabilities;
- suggested mitigations; and
- whether anyone else has received the report.

Do not access data that is not yours, disrupt services, or retain sensitive data
while researching a report.

## Response and remediation targets

We aim to acknowledge private reports within two working days. Confirmed issues
are triaged and remediated according to these maximum targets:

| Severity | Triage           | Fix or mitigation merged |
| -------- | ---------------- | ------------------------ |
| Critical | Same working day | 24 hours                 |
| High     | 1 working day    | 7 days                   |
| Medium   | 3 working days   | 30 days                  |
| Low      | 10 working days  | 90 days                  |

If a complete fix cannot be released within the target, maintainers document a
time-limited mitigation and an owner. Any exception requires an explicit risk
decision; an alert must not be silently dismissed.

## Disclosure

Maintainers will coordinate validation, remediation, release, and public
disclosure with the reporter. Please allow time for supported packages and
deployed services to be updated before publishing technical details. Credit is
given when requested and legally possible.

## Container vulnerability exceptions

The runtime image has a zero-finding policy across all Trivy severities,
including vulnerabilities that do not yet have a vendor fix. A temporary
exception may be added only to `.trivyignore.yaml` and must:

- identify an exact package version with a PURL;
- expire within 90 days;
- state an owner, technical rationale, and remediation plan; and
- receive review from the security-sensitive file owners in `CODEOWNERS`.

The container workflow records the complete, unfiltered scan as an artifact and
applies exceptions only to the blocking gate. An expired, blanket, malformed, or
unscoped exception fails before the image scan. Removing or weakening the gate
is not an acceptable exception mechanism.

The policy file uses JSON syntax, which is valid YAML and keeps local validation
dependency-free. Add one entry per finding using the
[Trivy v0.72 ignore-file schema](https://trivy.dev/docs/v0.72/configuration/filtering/):

```json
{
  "vulnerabilities": [
    {
      "id": "<CVE-ID>",
      "purls": ["pkg:<type>/<namespace>/<name>@<exact-version>"],
      "expired_at": "<YYYY-MM-DD within 90 days>",
      "statement": "Owner: @team; rationale: <technical reason>; remediation: <tracked upgrade or fix>."
    }
  ]
}
```

Validate a proposed policy locally with:

```sh
node --test .github/scripts/validate-trivy-ignore.test.mjs
node .github/scripts/validate-trivy-ignore.mjs .trivyignore.yaml
```
