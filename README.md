# My Blog

A personal blog built with Next.js 16 and local MDX files.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Content Management**: MDX with gray-matter and next-mdx-remote
- **Language**: TypeScript
- **Theme**: next-themes (Dark mode support)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:3000
```

## Adding Posts

Create a `.mdx` file in `content/posts/`:

```mdx
---
title: Post Title
description: Post description
date: "2025-10-11"
---

Your content here...
```

## Deployment

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## License

MIT
