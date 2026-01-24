---
name: monorepo-management
description: Turborepo monorepo with pnpm 10.x workspaces, optimized for NestJS 11.x + Next.js 15.x + React 19.x + Prisma 7.x stack. Use when: (1) Setting up new monorepo projects with apps/ and packages/ structure, (2) Configuring pnpm workspaces and Turborepo tasks, (3) Managing shared dependencies with @repo/* naming, (4) Setting up database, shared types, and tsconfig packages, (5) Implementing path aliases and workspace protocols, (6) Configuring build pipelines and development workflows, (7) Managing environment variables and dev tooling (Husky, Prettier, ESLint)
license: MIT
metadata:
  author: Kadajett
  version: "2.0.0"
---

# Monorepo Management

Template-based Turborepo monorepo with pnpm 10.x workspaces, optimized for full-stack development with NestJS API, Next.js web, and shared packages.

## Technology Stack

- **Package Manager**: pnpm 10.x
- **Build System**: Turborepo 2.x
- **Backend**: NestJS 11.x
- **Frontend**: Next.js 15.x + React 19.x
- **Database**: Prisma 7.x
- **Node.js**: >=24.0.0

## Repository Structure

```
{{PROJECT_NAME}}/
├── apps/
│   ├── api/              # NestJS Backend
│   ├── web/              # Next.js Frontend
│   └── mcp-server/       # Optional MCP Server
│
├── packages/
│   ├── database/         # Prisma package (@repo/database)
│   ├── shared/           # Shared types/utils (@repo/shared)
│   ├── tsconfig/         # Shared TypeScript configs (@repo/tsconfig)
│   └── eslint-config/   # ESLint configs (@repo/eslint-config)
│
├── pnpm-workspace.yaml  # Workspace definition
├── turbo.json           # Turborepo tasks
├── package.json         # Root scripts
└── .env.example        # Environment variables
```

## When to Use This Skill

- Setting up new monorepo with apps/ and packages/ structure
- Configuring pnpm workspaces with @repo/* package naming
- Setting up Turborepo tasks for build/dev/test/lint
- Managing shared dependencies (database, shared types, tsconfig)
- Implementing path aliases (@app/*, @repo/*)
- Configuring environment variables (single .env at root)
- Setting up development tooling (Husky, Prettier, ESLint)

## Reference Materials

### Architecture Rules

See [references/architecture-rules.md](references/architecture-rules.md) for:
- Complete repository structure
- Configuration files (turbo.json, pnpm-workspace.yaml, package.json)
- Package configurations (database, shared, tsconfig)
- App configurations (api, web)
- Environment variables rules
- Path aliases setup
- Dependency graph
- VS Code settings
- Development workflow
- AI generation checklist

### Scaffolds

The `scaffolds/` directory in the template contains production-ready configurations:

- **Root configs**: `turbo.json`, `pnpm-workspace.yaml`, `package.json`
- **Packages**:
  - `packages/database/` - Prisma schema, migrations, seed
  - `packages/shared/` - Types, enums, utilities
  - `packages/tsconfig/` - Base, NestJS, Next.js configs
- **Apps**: Structure for `api/` and `web/` applications

## Quick Start Commands

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Start all apps
pnpm dev

# Individual apps
pnpm api:dev     # Backend only
pnpm web:dev     # Frontend only
pnpm db:studio   # Prisma Studio
```

## Key Configuration Patterns

### 1. Workspace Dependencies

```json
{
  "dependencies": {
    "@repo/database": "workspace:*",
    "@repo/shared": "workspace:*",
    "@repo/tsconfig": "workspace:*"
  }
}
```

### 2. Path Aliases

**NestJS (apps/api/tsconfig.json):**
```json
{
  "paths": {
    "@app/*": ["src/*"],
    "@repo/database": ["../../packages/database/src"],
    "@repo/shared": ["../../packages/shared/src"]
  }
}
```

**Next.js (apps/web/tsconfig.json):**
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@repo/shared": ["../../packages/shared/src"]
  }
}
```

### 3. Turborepo Tasks

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

## Package Naming Convention

- **Internal packages**: `@repo/*` (e.g., `@repo/database`, `@repo/shared`)
- **Apps**: Short names (e.g., `api`, `web`, `mcp-server`)
- **All packages**: `private: true` (not published to npm)

## Environment Variables

**Rules:**
- Single `.env` file at repository root
- No `.env` files in sub-packages
- Use `process.env` throughout code
- Type-safe with Zod validation in `config/env.ts`
- Client-side variables in Next.js require `NEXT_PUBLIC_` prefix

**Common variables:**
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - JWT signing key
- `API_PORT`, `WEB_PORT` - App ports
- `API_URL` - Backend URL for frontend

## AI Generation Checklist

### Repository Setup
- [ ] Create apps/ and packages/ directories
- [ ] Create pnpm-workspace.yaml
- [ ] Create turbo.json with tasks
- [ ] Create root package.json with scripts
- [ ] Create .env.example

### Packages
- [ ] packages/database with Prisma schema
- [ ] packages/shared for types/utils/enums
- [ ] packages/tsconfig (base, nestjs, nextjs)
- [ ] packages/eslint-config (optional)

### Apps
- [ ] apps/api following NestJS architecture
- [ ] apps/web following Next.js architecture
- [ ] Configure path aliases in tsconfig.json

### Tooling
- [ ] Setup ESLint rules
- [ ] Configure Prettier
- [ ] Setup Husky git hooks (optional)
- [ ] Create README.md

## Development Workflow

1. **Install**: `pnpm install`
2. **Configure**: `cp .env.example .env` and edit
3. **Database**: `pnpm db:generate && pnpm db:migrate`
4. **Develop**: `pnpm dev` (starts all apps)
5. **Test**: `pnpm test` or `pnpm test:e2e`
6. **Build**: `pnpm build`
7. **Clean**: `pnpm clean` (removes node_modules and build artifacts)

## Common Commands

```bash
# Filter to specific package
pnpm --filter api dev
pnpm --filter @repo/database db:generate

# Run in all packages
pnpm -r build
pnpm -r test

# Add dependency
pnpm add react --filter @repo/ui
pnpm add -D typescript -w  # Add to root
```

### Initial Setup

```bash
# Create new monorepo
npx create-turbo@latest my-monorepo
cd my-monorepo

# Structure:
# apps/
#   web/          - Next.js app
#   docs/         - Documentation site
# packages/
#   ui/           - Shared UI components
#   config/       - Shared configurations
#   tsconfig/     - Shared TypeScript configs
# turbo.json      - Turborepo configuration
# package.json    - Root package.json
```

### Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
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
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "pnpm@8.0.0"
}
```

### Package Structure

```json
// packages/ui/package.json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/button.js",
      "types": "./dist/button.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/tsconfig": "workspace:*",
    "tsup": "^7.0.0",
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "react": "^18.2.0"
  }
}
```

## pnpm Workspaces

### Setup

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tools/*"
```

```json
// .npmrc
# Hoist shared dependencies
shamefully-hoist=true

# Strict peer dependencies
auto-install-peers=true
strict-peer-dependencies=true

# Performance
store-dir=~/.pnpm-store
```

### Dependency Management

```bash
# Install dependency in specific package
pnpm add react --filter @repo/ui
pnpm add -D typescript --filter @repo/ui

# Install workspace dependency
pnpm add @repo/ui --filter web

# Install in all packages
pnpm add -D eslint -w

# Update all dependencies
pnpm update -r

# Remove dependency
pnpm remove react --filter @repo/ui
```

### Scripts

```bash
# Run script in specific package
pnpm --filter web dev
pnpm --filter @repo/ui build

# Run in all packages
pnpm -r build
pnpm -r test

# Run in parallel
pnpm -r --parallel dev

# Filter by pattern
pnpm --filter "@repo/*" build
pnpm --filter "...web" build  # Build web and dependencies
```

## Nx Monorepo

### Setup

```bash
# Create Nx monorepo
npx create-nx-workspace@latest my-org

# Generate applications
nx generate @nx/react:app my-app
nx generate @nx/next:app my-next-app

# Generate libraries
nx generate @nx/react:lib ui-components
nx generate @nx/js:lib utils
```

### Configuration

```json
// nx.json
{
  "extends": "nx/presets/npm.json",
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
      "cache": true
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"],
      "cache": true
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json"
    ],
    "sharedGlobals": []
  }
}
```

### Running Tasks

```bash
# Run task for specific project
nx build my-app
nx test ui-components
nx lint utils

# Run for affected projects
nx affected:build
nx affected:test --base=main

# Visualize dependencies
nx graph

# Run in parallel
nx run-many --target=build --all --parallel=3
```

## Shared Configurations

### TypeScript Configuration

```json
// packages/tsconfig/base.json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "declaration": true
  },
  "exclude": ["node_modules"]
}

// packages/tsconfig/react.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}

// apps/web/tsconfig.json
{
  "extends": "@repo/tsconfig/react.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### ESLint Configuration

```javascript
// packages/config/eslint-preset.js
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "react/react-in-jsx-scope": "off",
  },
};

// apps/web/.eslintrc.js
module.exports = {
  extends: ["@repo/config/eslint-preset"],
  rules: {
    // App-specific rules
  },
};
```

## Code Sharing Patterns

### Pattern 1: Shared UI Components

```typescript
// packages/ui/src/button.tsx
import * as React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// packages/ui/src/index.ts
export { Button, type ButtonProps } from './button';
export { Input, type InputProps } from './input';

// apps/web/src/app.tsx
import { Button } from '@repo/ui';

export function App() {
  return <Button variant="primary">Click me</Button>;
}
```

### Pattern 2: Shared Utilities

```typescript
// packages/utils/src/string.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

// packages/utils/src/index.ts
export * from "./string";
export * from "./array";
export * from "./date";

// Usage in apps
import { capitalize, truncate } from "@repo/utils";
```

### Pattern 3: Shared Types

```typescript
// packages/types/src/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

// Used in both frontend and backend
import type { User, CreateUserInput } from "@repo/types";
```

## Build Optimization

### Turborepo Caching

```json
// turbo.json
{
  "pipeline": {
    "build": {
      // Build depends on dependencies being built first
      "dependsOn": ["^build"],

      // Cache these outputs
      "outputs": ["dist/**", ".next/**"],

      // Cache based on these inputs (default: all files)
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "package.json"]
    },
    "test": {
      // Run tests in parallel, don't depend on build
      "cache": true,
      "outputs": ["coverage/**"]
    }
  }
}
```

### Remote Caching

```bash
# Turborepo Remote Cache (Vercel)
npx turbo login
npx turbo link

# Custom remote cache
# turbo.json
{
  "remoteCache": {
    "signature": true,
    "enabled": true
  }
}
```

## CI/CD for Monorepos

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # For Nx affected commands

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm turbo run build

      - name: Test
        run: pnpm turbo run test

      - name: Lint
        run: pnpm turbo run lint

      - name: Type check
        run: pnpm turbo run type-check
```

### Deploy Affected Only

```yaml
# Deploy only changed apps
- name: Deploy affected apps
  run: |
    if pnpm nx affected:apps --base=origin/main --head=HEAD | grep -q "web"; then
      echo "Deploying web app"
      pnpm --filter web deploy
    fi
```

## Best Practices

1. **Consistent Versioning**: Lock dependency versions across workspace
2. **Shared Configs**: Centralize ESLint, TypeScript, Prettier configs
3. **Dependency Graph**: Keep it acyclic, avoid circular dependencies
4. **Cache Effectively**: Configure inputs/outputs correctly
5. **Type Safety**: Share types between frontend/backend
6. **Testing Strategy**: Unit tests in packages, E2E in apps
7. **Documentation**: README in each package
8. **Release Strategy**: Use changesets for versioning

## Common Pitfalls

- **Circular Dependencies**: A depends on B, B depends on A
- **Phantom Dependencies**: Using deps not in package.json
- **Incorrect Cache Inputs**: Missing files in Turborepo inputs
- **Over-Sharing**: Sharing code that should be separate
- **Under-Sharing**: Duplicating code across packages
- **Large Monorepos**: Without proper tooling, builds slow down

## Publishing Packages

```bash
# Using Changesets
pnpm add -Dw @changesets/cli
pnpm changeset init

# Create changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish
pnpm changeset publish
```

```yaml
# .github/workflows/release.yml
- name: Create Release Pull Request or Publish
  uses: changesets/action@v1
  with:
    publish: pnpm release
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Resources

- **references/turborepo-guide.md**: Comprehensive Turborepo documentation
- **references/nx-guide.md**: Nx monorepo patterns
- **references/pnpm-workspaces.md**: pnpm workspace features
- **assets/monorepo-checklist.md**: Setup checklist
- **assets/migration-guide.md**: Multi-repo to monorepo migration
- **scripts/dependency-graph.ts**: Visualize package dependencies
