# Repository Guidelines

## Project Structure & Module Organization

This is a bilingual personal blog built with Next.js App Router, TypeScript, Tailwind CSS v4, and local MDX files. Route files live in `app/`, shared React components live in `components/`, content helpers live in `lib/`, and MDX content lives in `content/`. Use `content/posts/` for dated blog posts and `content/pages/` for standalone pages.

## Build, Test, and Development Commands

Use `pnpm install` to install dependencies from `pnpm-lock.yaml`.

- `pnpm dev` starts the local Next.js development server.
- `pnpm build` creates a production build and static export.
- `pnpm start` serves the production build.
- `pnpm lint` runs ESLint with the Next.js core web vitals and TypeScript rules.

## Coding Style & Naming Conventions

Write TypeScript and React components using the existing style: two-space indentation in TSX files, no semicolons, double quotes, and named exports for reusable components. Keep route components colocated under `app/` and keep simple UI pieces in `components/`. Use kebab-case file names for components, such as `mode-toggle.tsx`, and lowercase route folder names. Prefer Tailwind utility classes for styling.

## Content Guidelines

Posts are MDX files under `content/posts/` with front matter:

```mdx
---
title: Post Title
description: Post description
date: "2025-10-11"
---
```

Pages under `content/pages/` require `title` and may include `description`. Keep slugs stable by renaming files only when the URL should change.

Chinese/default content uses `name.mdx`; English content uses `name.en.mdx` with the same slug. For example, `content/posts/my-post.mdx` maps to `/posts/my-post`, and `content/posts/my-post.en.mdx` maps to `/en/posts/my-post`.

## Testing Guidelines

No automated test framework is currently configured. For changes, run `pnpm lint` and `pnpm build`. For UI or content changes, also run `pnpm dev` and review the affected page in a browser.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commits with optional Conventional Commit prefixes, for example `feat: update mode-toggle component` and `chore: update dependencies`. Keep PRs focused, describe the visible behavior changed, link related issues when available, and include screenshots for UI changes.

## Agent-Specific Instructions

Keep changes minimal and directly tied to the request. Do not add abstractions, broad refactors, or unrelated cleanup while fixing a small issue.
