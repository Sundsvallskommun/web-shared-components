---
name: conventional-commit-workflow
description: Enforce a repo-safe Git commit workflow centered on conventional commits. Use when Codex is finishing implementation work in a repository, preparing to commit changes, deciding whether work should be split into multiple commits, or needs to ask the user whether a commit should be created after task completion.
---

# Conventional Commit Workflow

## Overview

Follow this skill when work in a repository may end in one or more Git commits. Keep commit behavior predictable: ask before committing, use conventional commit messages, and split unrelated or mixed changes into separate commits.

## Core Rules

- Ask whether the user wants a commit after completing the task. Do not commit automatically.
- Use conventional commits for every commit.
- Split the work into multiple commits when:
  - a change mixes features and fixes
  - a change spans many packages and can be grouped into clearer units
  - unrelated refactors or docs changes are mixed into product changes

## End-Of-Task Workflow

1. Finish the requested work and verify it as appropriate.
2. Summarize the completed change to the user.
3. Ask whether the user wants the work committed.
4. If the user declines, stop without creating a commit.
5. If the user approves, inspect the diff and decide whether one commit or several commits are appropriate.
6. Create focused commit groupings and write conventional commit messages for each.

## Commit Grouping Guidance

Prefer one commit when the change is a single coherent unit.

Prefer multiple commits when there are distinct change types or scopes. Common split patterns:

- `feat:` for user-visible functionality
- `fix:` for bug fixes or regressions
- `refactor:` for internal structural cleanup without behavior change
- `docs:` for documentation-only updates
- `test:` for test-only changes
- `chore:` for maintenance work that does not fit the categories above

When splitting commits, group by intent first and package second. Example:

- `fix(alert): correct alert class mapping`
- `feat(ai): add speech translation hook`
- `docs: update repository agent guidance`

If many packages are touched for the same reason, one commit can still be correct. If many packages are touched for different reasons, split them.

## Message Format

Use conventional commit messages in the standard shape:

```text
type(scope): summary
```

or, when no scope helps:

```text
type: summary
```

Keep summaries short, specific, and imperative. Avoid vague messages such as `misc updates` or `fix stuff`.

## Do not

- Never commit on default branches (main, develop, etc).

## Prompting The User

Use a direct completion prompt after the work is done. Example:

- `Do you want me to commit this? I'd use conventional commits and split the work if it should land as more than one logical change.`

If the user says yes, propose the commit plan when useful. Example:

- `I'd split this into two commits: one fix for the alert package and one docs update for the agent guidance.`

If the split is obvious and low risk, proceed after approval without over-explaining.

If the user wants to commit on a default branch, prompt if that is the purpose, or if to create a new branch (use skill `developmen-branch-workflow`)
