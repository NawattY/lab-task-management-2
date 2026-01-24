## Session: ARCHITECTURE
- Status: In Progress
- Last Updated: Sat Jan 24 2026

## Prerequisites Read
- PROJECT_BRIEF.md: Yes
- Reference Templates:
  - Monorepo: `.opencode/refs/monorepo-template/`
  - Backend: `.opencode/refs/app-starter/nestjs`

## Captured Information
### Repository
- Type: Monorepo (TurboRepo based on reference)
- Structure:
  - `apps/` (backend/frontend)
  - `packages/` (database, shared, tsconfig)
- References: Uses `.opencode/refs/monorepo-template/`

### Tech Stack
- Backend: NestJS 11.x (Clean Architecture from reference)
- Frontend: Next.js + Tailwind CSS + Shadcn/ui
- State: Zustand
- Data Fetching: React Query
- Database: PostgreSQL (Docker/Self-hosted)
- Infra: Docker, Redis

### Architecture Pattern
- Pattern: Strict Clean Architecture (Hexagonal-ish)
- Structure from `modules/example/`:
  - `api/` (Controllers, DTOs)
  - `application/` (Services, Input/Output Models)
  - `domain/` (Entities)
  - `infrastructure/` (Prisma Datasources)
  - `exceptions/` (Module-specific exceptions)

### Coding Standards
- Defined in `.opencode/refs/app-starter/nestjs/coding-standards.md` (Need to read)
- Defined in `.opencode/refs/app-starter/nestjs/architecture-rules.md` (Need to read)

## Ready for Generation: Yes
