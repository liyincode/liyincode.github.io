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

Create a Chinese/default `.mdx` file in `content/posts/`:

```mdx
---
title: 文章标题
description: 文章简介
date: "2025-10-11"
---

正文内容...
```

Add an English version with the same slug plus `.en`:

```txt
content/posts/my-post.mdx
content/posts/my-post.en.mdx
```

The default post is available at `/posts/my-post`; the English post is available at `/en/posts/my-post`.

## Deployment

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## License

MIT
