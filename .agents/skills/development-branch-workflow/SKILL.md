---
name: development-branch-workflow
description: Start development on a fresh Git branch before implementation begins. Use when a user wants to start a new development thread, begin a feature or fix, create a branch first, or follow the repo branch naming convention with a Jira ticket and short summary. Prompt for `feature` or `fix`, prompt for the Jira ticket, derive or confirm a short summary, and create the branch as `type/ticket-short-summary` or `type/short-summary` when the ticket is unknown.
---

# Development Branch Workflow

## Overview

Start new implementation work on a fresh branch before making code changes.

Follow the repository convention of `feature/...` or `fix/...`, preserve the Jira ticket exactly as the user enters it, and normalize only the summary portion into a lowercase hyphenated slug.

## Workflow

1. Confirm that the task is starting a new development thread or new implementation effort.
2. Inspect the current Git state before branching.
3. If the worktree is dirty, stop and ask the user how to proceed before creating or checking out another branch.
4. Ask for the branch type and allow only `feature` or `fix`.
5. Ask for the Jira ticket.
6. Derive a short summary from the user request and confirm it if the intent is ambiguous.
7. Convert the summary to a branch slug:
   - lowercase only
   - words separated by single hyphens
   - remove or collapse punctuation and whitespace
8. Build the branch name:
   - if the ticket is known: `type/ticket-short-summary`
   - if the ticket is unknown: `type/short-summary`
9. Check whether the target branch already exists locally or remotely.
10. If the branch already exists, stop and ask whether to reuse it or choose a different summary.
11. Create the new branch from `origin/main` when available, otherwise from local `main`.
12. Do not start implementation work until the branch is created successfully.

## Git Checks

Run these checks before creating the branch:

- identify the current branch
- inspect whether the worktree has uncommitted or untracked changes
- confirm that `origin/main` exists; if not, fall back to local `main`

If there are local changes, do not silently carry them onto the new branch. Ask the user what they want to do.

## Naming Rules

- Use only `feature` or `fix` as the branch prefix.
- Preserve the Jira ticket exactly as provided. Do not force uppercase or lowercase.
- Normalize only the summary segment.
- Keep the summary short and descriptive.
- Do not use underscores or spaces in the branch name.
- If the user does not know the Jira ticket, omit it entirely instead of inserting placeholders.

## Examples

- `feature/AI-423-textareagroup`
- `fix/UF-16681-toast-bug`
- `feature/HYDRAN-378-update-progress-stepper`
- `fix/header-logolink`

## Prompting Guidance

Use short, direct prompts:

- ask whether the branch should be a `feature` or `fix`
- ask for the Jira ticket
- propose the derived summary when it is not explicit in the request

If the branch name is ready and safe to create, state the exact name before running the Git command.

## Safety Rules

- Do not create `bugfix/`, `feat/`, or other alternate prefixes for this workflow.
- Do not rename an existing branch automatically.
- Do not guess a Jira ticket.
- Do not continue past a dirty worktree or branch-name collision without user confirmation.
