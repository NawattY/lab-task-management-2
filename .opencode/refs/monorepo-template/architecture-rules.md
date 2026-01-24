# Turborepo Monorepo — Architecture Rules

> **PURPOSE:** This document defines architecture patterns for Turborepo monorepo setup.  
> **AUDIENCE:** AI agents scaffolding, configuring, or reviewing monorepo projects.  
> **STACK:** pnpm 10.x + Turborepo 2.x + NestJS 11.x + Next.js 15.x + React 19.x + Prisma 7.x

---

## 1) Repository Structure

```
{{PROJECT_NAME}}/
├── apps/
│   ├── api/                             # NestJS Backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── routes/                  # Route Registry
│   │   │   │   ├── route-constants.ts
│   │   │   │   └── v1.routes.ts
│   │   │   ├── modules/                 # Domain Modules (4-layer)
│   │   │   │   └── {module}/
│   │   │   │       ├── api/
│   │   │   │       │   ├── controllers/
│   │   │   │       │   ├── dtos/
│   │   │   │       │   └── swagger/
│   │   │   │       ├── application/
│   │   │   │       │   ├── {module}.service.ts
│   │   │   │       │   └── models/
│   │   │   │       ├── domain/
│   │   │   │       │   ├── entities/
│   │   │   │       │   ├── value-objects/
│   │   │   │       │   └── enums/
│   │   │   │       ├── infrastructure/
│   │   │   │       │   └── datasources/
│   │   │   │       ├── exceptions/
│   │   │   │       └── {module}.module.ts
│   │   │   ├── core/                    # Infrastructure (auth, config)
│   │   │   ├── shared/                  # Utilities
│   │   │   └── constants/
│   │   ├── test/
│   │   │   ├── api/                     # Contract tests
│   │   │   ├── flows/                   # E2E flows
│   │   │   └── integration/             # DB integration
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                             # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/                     # App Router
│   │   │   │   ├── (auth)/             # Auth route group
│   │   │   │   ├── (public)/           # Public route group
│   │   │   │   ├── (dashboard)/        # Protected route group
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/                 # shadcn/ui
│   │   │   │   ├── layout/
│   │   │   │   └── features/
│   │   │   ├── hooks/
│   │   │   │   ├── queries/            # React Query hooks
│   │   │   │   └── mutations/
│   │   │   ├── lib/
│   │   │   │   ├── api-client.ts
│   │   │   │   └── utils.ts
│   │   │   ├── stores/                 # Zustand stores
│   │   │   ├── config/
│   │   │   │   └── env.ts              # Type-safe env
│   │   │   └── types/
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mcp-server/                      # MCP Server (optional)
│       ├── src/
│       │   ├── index.ts
│       │   ├── tools/
│       │   ├── resources/
│       │   └── api-client/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── database/                        # Prisma Package
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   ├── index.ts                # Export PrismaClient
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   ├── shared/                          # Shared Types & Utils
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── enums/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── eslint-config/                   # ESLint Configs
│   │   ├── base.js
│   │   ├── nestjs.js
│   │   ├── nextjs.js
│   │   └── package.json
│   │
│   └── tsconfig/                        # TypeScript Configs
│       ├── base.json
│       ├── nestjs.json
│       ├── nextjs.json
│       └── package.json
│
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── .env.example
├── .gitignore
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

---

## 2) Configuration Files

### `pnpm-workspace.yaml`
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### `turbo.json`
```json
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
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "test:e2e": {
      "dependsOn": ["^build"]
    },
    "db:generate": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Root `package.json`
```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    
    "api:dev": "pnpm --filter api dev",
    "web:dev": "pnpm --filter web dev",
    
    "db:generate": "pnpm --filter @repo/database db:generate",
    "db:migrate": "pnpm --filter @repo/database db:migrate",
    "db:push": "pnpm --filter @repo/database db:push",
    "db:studio": "pnpm --filter @repo/database db:studio",
    "db:seed": "pnpm --filter @repo/database db:seed",
    
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@turbo/gen": "^2.4.0",
    "turbo": "^2.4.0",
    "prettier": "^3.4.0",
    "eslint": "^9.17.0",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0"
  },
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=24.0.0",
    "pnpm": ">=10.0.0"
  }
}
```

---

## 3) Package Configurations

### `packages/database/package.json`
```json
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx src/seed.ts",
    "clean": "rm -rf node_modules .prisma"
  },
  "dependencies": {
    "@prisma/client": "^7.2.0"
  },
  "devDependencies": {
    "prisma": "^7.2.0",
    "tsx": "^4.19.0"
  }
}
```

### `packages/shared/package.json`
```json
{
  "name": "@repo/shared",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./types": "./src/types/index.ts",
    "./enums": "./src/enums/index.ts",
    "./utils": "./src/utils/index.ts"
  },
  "scripts": {
    "clean": "rm -rf node_modules dist"
  }
}
```

### `packages/tsconfig/base.json`
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### `packages/tsconfig/nestjs.json`
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### `packages/tsconfig/nextjs.json`
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "plugins": [{ "name": "next" }],
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 4) App Configurations

### `apps/api/package.json`
```json
{
  "name": "api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "test": "jest",
    "test:e2e": "jest --config test/jest-e2e.json",
    "lint": "eslint \"{src,test}/**/*.ts\"",
    "clean": "rm -rf dist node_modules"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^8.0.0",
    "@nestjs/config": "^3.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@repo/database": "workspace:*",
    "@repo/shared": "workspace:*",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    "express": "^5.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@repo/eslint-config": "workspace:*",
    "@repo/tsconfig": "workspace:*",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.0",
    "typescript": "^5.7.0"
  }
}
```

### `apps/api/tsconfig.json`
```json
{
  "extends": "@repo/tsconfig/nestjs.json",
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/*"],
      "@repo/database": ["../../packages/database/src"],
      "@repo/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*", "test/**/*"]
}
```

### `apps/web/package.json`
```json
{
  "name": "web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port ${WEB_PORT:-3001}",
    "build": "next build",
    "start": "next start --port ${WEB_PORT:-3001}",
    "lint": "next lint",
    "clean": "rm -rf .next node_modules"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@repo/shared": "workspace:*",
    "@tanstack/react-query": "^5.62.0",
    "zustand": "^5.0.0",
    "zod": "^4.3.2"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/tsconfig": "workspace:*",
    "@types/node": "^25.0.3",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.1.18",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.7.0"
  }
}
```

### `apps/web/tsconfig.json`
```json
{
  "extends": "@repo/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@repo/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 5) Environment Variables

### `.env.example`
```bash
# ═══════════════════════════════════════════════════════
# PROJECT NAME - Environment Variables
# ═══════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────
# App Configuration
# ─────────────────────────────────────────────────────
NODE_ENV=development
API_PORT=3000
WEB_PORT=3001
API_URL=http://localhost:3000

# ─────────────────────────────────────────────────────
# Database
# ─────────────────────────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public

# ─────────────────────────────────────────────────────
# JWT Authentication
# ─────────────────────────────────────────────────────
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# ─────────────────────────────────────────────────────
# External Services (Optional)
# ─────────────────────────────────────────────────────
# LINE_CHANNEL_SECRET=
# LINE_CHANNEL_ACCESS_TOKEN=
# GEMINI_API_KEY=
# OPENAI_API_KEY=
```

### Environment Rules
| Rule | Description |
|------|-------------|
| **Single `.env` at root** | ห้ามสร้าง `.env` ใน sub-packages |
| **No secrets in code** | ห้าม hardcode, ใช้ `process.env` เสมอ |
| **Type-safe env** | ใช้ Zod validation ใน config/env.ts |
| **VITE_ prefix** | Client-side env ใน Next.js/Vite ต้องมี prefix |

---

## 6) Path Aliases

### NestJS (apps/api)
```json
{
  "paths": {
    "@app/*": ["src/*"],
    "@repo/database": ["../../packages/database/src"],
    "@repo/shared": ["../../packages/shared/src"]
  }
}
```

### Next.js (apps/web)
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@repo/shared": ["../../packages/shared/src"]
  }
}
```

---

## 7) Dependency Graph

```mermaid
graph TD
    api[apps/api] --> database[@repo/database]
    api --> shared[@repo/shared]
    web[apps/web] --> shared
    mcp[apps/mcp-server] --> shared
    database --> prisma[Prisma Client]
```

**Rules:**
- `apps/` depend on `packages/`
- `packages/` are standalone
- Use `workspace:*` for internal dependencies

---

## 8) VS Code Settings

### `.vscode/settings.json`
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true,
    "**/.turbo": true
  },
  
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/pnpm-lock.yaml": true
  }
}
```

### `.vscode/extensions.json`
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## 9) Development Workflow

### Quick Start
```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your values

# 3. Setup database
pnpm db:generate
pnpm db:migrate
pnpm db:seed  # Optional

# 4. Start all apps
pnpm dev

# Apps available at:
# - API: http://localhost:3000
# - Web: http://localhost:3001
# - API Docs: http://localhost:3000/api/docs
```

### Individual Apps
```bash
pnpm api:dev        # Backend only
pnpm web:dev        # Frontend only
pnpm db:studio      # Prisma Studio
```

### Common Tasks
```bash
pnpm test           # Run all tests
pnpm test:e2e       # E2E tests
pnpm lint           # Lint all apps
pnpm build          # Build for production
pnpm clean          # Clean all node_modules and build artifacts
```

---

## 10) Architecture References

For detailed coding rules per app, see:

| App | Architecture Rules | Coding Standards |
|-----|-------------------|------------------|
| **NestJS** | [app-starter/nestjs/architecture-rules.md](../app-starter/nestjs/architecture-rules.md) | [coding-standards.md](../app-starter/nestjs/coding-standards.md) |
| **Next.js** | [app-starter/nextjs/architecture-rules.md](../app-starter/nextjs/architecture-rules.md) | [coding-standards.md](../app-starter/nextjs/coding-standards.md) |
| **React+Vite** | [app-starter/reactjs-vite/architecture-rules.md](../app-starter/reactjs-vite/architecture-rules.md) | [coding-standards.md](../app-starter/reactjs-vite/coding-standards.md) |

---

## 11) AI Generation Checklist

When generating a new monorepo project:

### Initial Setup
- [ ] Create repository structure
- [ ] Setup pnpm workspace (`pnpm-workspace.yaml`)
- [ ] Configure Turborepo (`turbo.json`)
- [ ] Create root `package.json`
- [ ] Create `.env.example`
- [ ] Setup VS Code settings

### Packages
- [ ] Create `packages/database` with Prisma
- [ ] Create `packages/shared` for types/utils
- [ ] Create `packages/tsconfig` for shared configs
- [ ] Create `packages/eslint-config` for linting

### Apps
- [ ] Create `apps/api` following NestJS architecture-rules
- [ ] Create `apps/web` following Next.js architecture-rules
- [ ] Configure path aliases in each app's tsconfig

### Quality
- [ ] Setup ESLint rules
- [ ] Configure Prettier
- [ ] Setup Husky for git hooks
- [ ] Add README for each app/package

---

*End of Monorepo Architecture Rules*
