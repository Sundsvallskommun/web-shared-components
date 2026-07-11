# AGENTS.md

## Purpose

This repository is a Yarn/Lerna/Nx monorepo for `@sk-web-gui/*` packages. It contains the shared design system, Tailwind-based styling, React component packages, and Storybook stories used to develop and document the components.

## Skills

Always check `.agents/skills` for skills

## Source Of Truth

- Design source: `https://www.figma.com/design/QPYqnbSJ8DS5ghGNFgt4tm/Designsystem-Components?node-id=1-14&t=k5l8BxGrWiC9hXMI-1`
- Runtime styling source: `packages/core`
- Aggregated public React entrypoint: `packages/react`
- Component playground and docs: Storybook

When implementing or updating UI, align with the Figma design system first, then fit the implementation into the existing package conventions in this repo.

## Non-Negotiable Rules

- Always put styling in the separate package `packages/core`.
- Never manually update version numbers in any `package.json`. Lerna handles versioning.
- Use Tailwind CSS conventions already established in this repository.
- Use Storybook for component development, examples, and visual verification.
- If creating a new component, ask the user before adding it to `packages/react`.

## Repository Shape

- `packages/core`: Tailwind preset/plugin and component styling definitions.
- `packages/<component>`: individual publishable component packages.
- `packages/react`: umbrella React package that re-exports selected component packages.
- `packages/theme`, `packages/utils`: shared utilities used across packages.
- `packages/*/stories`: Storybook stories colocated with each package.
- `.storybook`: Storybook app and Vite configuration.

## Styling Rules

- All visual styling belongs in `packages/core/src/components/**`.
- Register new Tailwind component definitions in `packages/core/src/components.ts`.
- Keep component packages focused on React structure, behavior, typing, and class composition.
- Package-local files such as `src/styles.ts` may map props to class names, but they should not become the source of Tailwind design tokens or component CSS rules. Those belong in `packages/core`.
- Reuse existing tokens, scales, spacing, radius, and color naming already present in `core` and `theme`.

## Adding Or Updating Components

For a new component, follow this default shape:

1. Add or update styling in `packages/core/src/components/<component>.ts`.
2. Register the styling in `packages/core/src/components.ts`, including any dependencies on other core component styles.
3. Create or update the component package in `packages/<component>`.
4. Export through the package-local `src/index.ts` and package root `index.ts`.
5. Add Storybook stories in `packages/<component>/stories`.
6. Ask the user whether the component should also be exported from `packages/react`.
7. Only if approved, update `packages/react/src/index.ts` and `packages/react/package.json`.

## Storybook Expectations

- Story files live under `packages/*/stories/**/*.stories.tsx`.
- Prefer Storybook as the first place to validate API shape, states, and design fidelity.
- Keep stories representative of real usage and aligned with the design system naming already used in the repo.

## Tailwind Expectations

- This repo uses Tailwind CSS via the preset/plugin from `packages/core`.
- Root Tailwind config already points at package source and Storybook files.
- Favor existing utility/token patterns over introducing one-off conventions.
- If styling needs new reusable primitives or tokens, add them in `core` or the relevant shared theme package instead of hardcoding them in a component package.

## React Package Guidance

- `packages/react` is a curated re-export package, not an automatic mirror of every package.
- Do not add a new package to `packages/react` without confirming with the user first.
- When approved, keep `packages/react/src/index.ts` exports and `packages/react/package.json` dependencies in sync.

## Build And Dev Commands

- Install dependencies: `yarn`
- Run Storybook locally: `yarn dev`
- Build everything: `yarn build`
- Lint packages: `yarn lint`

Prefer targeted checks when making a localized change, but use Storybook to confirm component behavior whenever possible.

## Versioning And Release Safety

- Do not edit package versions manually.
- Do not treat changelog or version bumps as part of normal feature work unless the user explicitly asks for release-related work.
- Assume Lerna manages package version updates.

## Practical Defaults For Agents

- Preserve the existing package structure and naming conventions.
- Favor small, package-scoped changes over repo-wide refactors unless requested.
- When touching UI, verify whether a corresponding `core` style definition and Storybook story also need updates.
- When adding shared design behavior, check whether `theme`, `utils`, or `core` already provide a suitable primitive before creating a new one.
