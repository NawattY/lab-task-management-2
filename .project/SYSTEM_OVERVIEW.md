# System Overview — Task Management System

## 1. Project Description
This project is a high-performance, minimalist task tracker designed for solopreneurs and minimalists. It serves a dual purpose: a production-ready SaaS product and a robust "Micro SaaS Boilerplate" demonstrating strict Clean Architecture with NestJS and Next.js.

## 2. Repository Structure
**Type:** Monorepo (TurboRepo)

```text
.
├── apps/
│   ├── backend/                # NestJS API Application
│   │   ├── src/
│   │   │   ├── modules/        # Feature Modules (Auth, Task, etc.)
│   │   │   ├── core/           # Core Infrastructure (Auth, DB, Config)
│   │   │   ├── shared/         # Shared Utilities & DTOs
│   │   │   └── routes/         # Centralized Route Definitions
│   │   └── prisma/             # Database Schema & Migrations
│   │
│   └── frontend/               # Next.js Frontend Application
│       ├── src/
│       │   ├── app/            # App Router Pages
│       │   ├── components/     # Shadcn/ui & Custom Components
│       │   ├── lib/            # Utilities (axios, utils)
│       │   └── store/          # Zustand State Stores
│       └── public/
│
├── packages/                   # Shared Workspace Packages
│   ├── database/               # Shared Prisma Client (if extracted later)
│   ├── shared/                 # Shared Types/Enums between FE/BE
│   └── tsconfig/               # Shared TS Configurations
│
├── .project/                   # AI Context & Documentation
└── .opencode/                  # Reference Templates & Scaffolds
```

## 3. Tech Stack

| Layer | Technology | Version | Description |
|-------|------------|---------|-------------|
| **Backend** | NestJS | 11.x | Modular Monolith with Strict Clean Architecture |
| **Runtime** | Node.js | 24.x+ | LTS Version |
| **Frontend** | Next.js | 16.x+ (Latest) | React Framework (App Router) |
| **UI Library** | Tailwind CSS | 4.x (Latest) | Utility-first CSS |
| **Components** | Shadcn/ui | 3.x (Latest) | Reusable UI components |
| **State** | Zustand | 5.x (Latest) | Minimalist state management |
| **Data Fetching** | React Query | 5.x | TanStack Query for server state |
| **Database** | PostgreSQL | 17.x | Primary Relational DB |
| **ORM** | Prisma | 7.x+ | Type-safe ORM |
| **Cache** | Redis | 8.x | Caching & Queues (Future) |
| **Infra** | Docker | Latest | Containerization |

## 4. Environment Configuration

| Service | Variables | Purpose |
|---------|-----------|---------|
| **App** | `PORT`, `NODE_ENV` | Server config |
| **Database** | `DATABASE_URL` | Connection string |
| **Auth** | `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_SECRET` | Security tokens |
| **Redis** | `REDIS_HOST`, `REDIS_PORT` | Caching connection |
| **Frontend** | `NEXT_PUBLIC_API_URL` | API Endpoint for client |

## 5. Deployment

| Environment | Setup |
|-------------|-------|
| **Development** | Docker Compose (`postgres`, `redis`) + Local Node.js (`npm run dev`) |
| **Production** | Hetzner VPS (Dockerized) or Vercel (Frontend) + Supabase (DB) |

---
**Version:** 1.0
**Created:** Sat Jan 24 2026
**Status:** Active
