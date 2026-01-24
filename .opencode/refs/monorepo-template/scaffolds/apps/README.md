# Apps

This directory contains the monorepo applications.

## Structure

```
apps/
├── api/          # Backend (NestJS, etc.)
├── web/          # Frontend (Next.js, Nuxt, etc.)
└── admin/        # Admin panel (optional)
```

## Creating Apps

When creating apps, refer to technology-specific guidelines in `.agent/refs/app-starter/`:

```
app-starter/
├── nestjs/
│   ├── architecture-rules.md   # Directory structure, layer rules
│   └── coding-standards.md     # Code style, patterns
├── nextjs/
│   ├── architecture-rules.md
│   └── coding-standards.md
└── nuxtjs/
    ├── architecture-rules.md
    └── coding-standards.md
```

> **Note:** `app-starter/` contains **guidelines and rules**, not necessarily ready-to-use scaffolds. 
> Use these as reference when setting up apps or follow their patterns in `/architect` and `/developer`.

## Notes

- Each app has its own `package.json`
- Apps can import from `packages/*` (e.g., `@repo/database`, `@repo/shared`)
- Run individual apps with `pnpm --filter <app-name> dev`

