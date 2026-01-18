# Project Rules for Claude

## Project Overview

This is a Next.js blog application using:
- **Framework**: Next.js (App Router)
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Auth**: NextAuth.js

## Core Principles

1. **Reuse over creation** - Extend existing files before creating new ones
2. **Respect existing architecture** - Work within the current project structure
3. **Be specific** - Reference actual file paths and existing code
4. **No hallucinations** - Only reference files and code that actually exist

## Project Structure

```
app/
├── components/       # Shared components (PostCard, Pagination, Footer, etc.)
├── hooks/            # Custom hooks (useActiveHeading)
├── lib/              # Utility functions
├── auth/             # Authentication (NextAuth)
├── post/             # Post pages and components
├── category/         # Category pages and components
├── archive/          # Archive page
├── api/              # API routes
prisma/               # Database schema and migrations
public/               # Static assets
```

## Strict Rules

### DO NOT
- Create new component files when similar components exist in `app/components/`
- Create new API routes without checking existing ones in `app/api/`
- Add new utility functions without checking `app/lib/`
- Make up file paths or functions that don't exist
- Ignore the existing folder structure
- Create duplicate hooks when one exists in `app/hooks/`

### DO
- Check `app/components/` before creating any new component
- Extend existing components when adding features
- Follow the existing patterns (e.g., `_components` folders for page-specific components)
- Use existing Prisma models and extend them when needed
- Reference specific file paths in all suggestions
- Use existing Tailwind classes and design patterns

## Before Any Code Change

1. Have I checked if a similar component/function already exists?
2. Can I extend an existing file instead of creating a new one?
3. Am I following the existing naming conventions?
4. Does my change integrate with the current architecture?

## Existing Components to Reuse

- `PostCard.tsx` - For displaying post previews
- `PostCardList.tsx` - For listing multiple posts
- `Pagination.tsx` - For paginated content
- `MarkdownWithToc.tsx` - For rendering markdown with table of contents
- `NotificationBox.tsx` - For user notifications
- `Footer.tsx` - Site footer
- `LoadingScreen.tsx` - Loading states

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npx prisma studio # Open database GUI
npx prisma db push # Push schema changes
```

## Database Schema

```
Post (id, title, content, published, categoryId, createAt, updatedAt)
  └── belongs to Category
  └── has many Comment

Category (id, name, createdAt, updatedAt)
  └── has many Post

Comment (id, content, postId, userId, createAt, updatedAt)
  └── belongs to Post
  └── belongs to User

User (id, name, username, email, image, password)
  └── has many Comment, Account, Session
```

## API Endpoints

| Method | Route | Purpose | Auth Required |
|--------|-------|---------|---------------|
| GET | `/api/posts` | Get all posts | No |
| GET | `/api/comments/[id]` | Get comments for post | No |
| POST | `/api/comments` | Create comment | Yes |

## Validation Schemas

Located in `app/validationShemas.ts`:
- `postCommentSchema` - Validates comment creation (content: 1-65535 chars, postId: positive int)

## Authentication Patterns

```typescript
// Server-side (API routes, server components)
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
const session = await getServerSession(authOptions);

// Client-side
import { useSession } from "next-auth/react";
const { data: session } = useSession();
```

## Code Patterns

### Page-specific components
Place in `_components` folder next to the page:
```
app/post/
├── [id]/
│   └── page.tsx
└── _components/
    ├── PostDetail.tsx
    └── PostComment.tsx
```

### Shared components
Place in `app/components/` for reuse across pages.

### Server vs Client Components
- Default: Server components (async, can fetch data directly)
- Add `"use client"` for: hooks, event handlers, browser APIs

### Markdown Rendering
Use `react-markdown` with rehype plugins. See `PostDetail.tsx` for example.

## Environment Variables

Required in `.env`:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_URL` - App URL (http://localhost:3000)
- `NEXTAUTH_SECRET` - JWT secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` / `GITHUB_SECRET`
