# Monorepo Scaffolds Reference

This document references the production-ready scaffolds in `scaffolds/`.

## Available Scaffolds

### Root Configuration Files

| File | Purpose |
|-------|---------|
| `package.json` | Root package with scripts, devDependencies, engines |
| `turbo.json` | Turborepo task configuration (build, dev, lint, test, db) |
| `pnpm-workspace.yaml` | Workspace definition (apps/*, packages/*) |
| `.gitignore` | Git ignore patterns (node_modules, dist, .next, .env) |

### Packages

#### `packages/database/`

**Purpose**: Prisma database package shared across all apps.

**Files**:
- `prisma/schema.prisma` - Database schema
- `src/index.ts` - Exports PrismaClient
- `src/seed.ts` - Database seeding script
- `package.json` - Scripts: db:generate, db:migrate, db:push, db:studio, db:seed

**Dependencies**:
- `@prisma/client` (runtime)
- `prisma`, `tsx` (dev)

**Usage in apps**:
```typescript
import { PrismaClient } from '@repo/database';
```

#### `packages/shared/`

**Purpose**: Shared types, enums, and utilities used across apps.

**Structure**:
```
src/
├── types/       # TypeScript types/interfaces
├── enums/       # TypeScript enums
├── utils/       # Utility functions
└── index.ts     # Barrel export
```

**Files**:
- `src/types/index.ts` - Shared types
- `src/enums/index.ts` - Shared enums
- `src/utils/index.ts` - Shared utilities
- `src/index.ts` - Main export
- `package.json` - Exports configuration

**Exports configuration**:
```json
{
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts",
    "./enums": "./src/enums/index.ts",
    "./utils": "./src/utils/index.ts"
  }
}
```

**Usage in apps**:
```typescript
import { User } from '@repo/shared/types';
import { Status } from '@repo/shared/enums';
import { formatDate } from '@repo/shared/utils';
```

#### `packages/tsconfig/`

**Purpose**: Shared TypeScript configurations for different app types.

**Files**:
- `base.json` - Base TSConfig (strict mode, ES2022, NodeNext)
- `nestjs.json` - NestJS config (extends base, decorators, commonjs)
- `nextjs.json` - Next.js config (extends base, JSX, DOM lib)
- `package.json` - Package metadata

**Usage in apps**:
```json
{
  "extends": "@repo/tsconfig/nestjs.json"
}
```

### Apps

#### `apps/` Structure

Apps follow their respective architecture rules:
- **api/** - NestJS backend (follow `nestjs-best-practices` skill)
- **web/** - Next.js frontend
- **mcp-server/** - MCP server (optional)

**Common pattern**:
- Each app has its own `package.json`
- Each app extends from `@repo/tsconfig/*`
- Each app imports from `@repo/*` packages

## Usage Patterns

### 1. Adding a New Package

1. Create directory in `packages/new-package/`
2. Add `package.json` with `"name": "@repo/new-package"`
3. Implement `src/index.ts` with exports
4. Add to `pnpm-workspace.yaml` (if not using `*` pattern)
5. Use in apps: `"@repo/new-package": "workspace:*"`

### 2. Adding a New App

1. Create directory in `apps/new-app/`
2. Create `package.json` with `"name": "new-app"`
3. Extend from appropriate tsconfig: `"@repo/tsconfig/nestjs.json"`
4. Configure path aliases in `tsconfig.json`
5. Add dependencies to `@repo/*` packages as needed

### 3. Configuring Turborepo Tasks

Add tasks to `turbo.json`:

```json
{
  "tasks": {
    "custom-task": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true
    }
  }
}
```

Run from root: `pnpm turbo run custom-task`

### 4. Managing Dependencies

```bash
# Add to specific package
pnpm add react --filter web
pnpm add @nestjs/common --filter api

# Add dev dependency to package
pnpm add -D @types/node --filter @repo/database

# Add to root (all packages)
pnpm add -D eslint -w

# Add workspace dependency
pnpm add @repo/shared --filter web
```

### 5. Running Scripts

```bash
# Run in all packages/apps
pnpm turbo run build
pnpm turbo run test

# Run in specific package
pnpm --filter api dev
pnpm --filter @repo/database db:generate

# Run with filters
pnpm turbo run build --filter @repo/*
pnpm turbo run test --filter "...api"  # api and dependencies
```

## Scaffolds vs Reference Files

| Type | Location | Purpose |
|-------|-----------|---------|
| **Scaffolds** | `scaffolds/` | Production-ready templates to copy and modify |
| **Architecture Rules** | `references/architecture-rules.md` | Complete rules and patterns documentation |

Use scaffolds as templates for new projects, and architecture rules for understanding patterns and making decisions.

## Quick Template Reference

### Minimal Monorepo Setup

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

```json
// package.json (root)
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "devDependencies": {
    "turbo": "^2.4.0"
  },
  "packageManager": "pnpm@10.0.0"
}
```

*End of Scaffolds Reference*
