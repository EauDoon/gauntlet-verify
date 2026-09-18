# Security policy

This skill is used in high-stakes contexts: reference builds that ship to users, and verification of research that lands in public statements or decisions people act on. A flaw in the skill is a flaw in those outputs, so please report issues rather than work around them.

## Supported versions

Only the latest release on `main` is supported. Older tagged versions are not patched.

## How to report a security issue

Use GitHub private vulnerability reporting: go to the repository's Security tab, click "Report a vulnerability", and fill in the form. The report goes to the maintainers without disclosing the issue publicly.

For full step-by-step instructions, see GitHub's docs on private vulnerability reporting:
https://docs.github.com/en/code-security/security-advisories/guidance/reporting-a-vulnerability

Do not open a public GitHub issue for a security problem. Public issues let attackers find the flaw before it is fixed.

## What to include

- A clear description of the issue and the impact.
- Reproduction steps, with the model and agent runtime if relevant.
- Any known workarounds.

Reports are acknowledged within a reasonable time. Fixes are shipped on a new release once verified.