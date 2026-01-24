# Project Brief: Task Management System

## Executive Summary
This project aims to build a high-performance, minimalist task tracker for users overwhelmed by complex project management tools. Simultaneously, it serves as a robust "Micro SaaS Boilerplate" (Core Engine) to reduce setup time for future projects by 50%, demonstrating strict Clean Architecture principles using NestJS and Next.js.

## Problem Statement
- **Problem:** Existing project management tools (Jira, Trello) are feature-bloated and distracting for individuals focusing on daily execution.
- **Impact:** Solopreneurs and freelancers lose time managing the "tool" rather than doing the work.
- **Current Gap:** Lack of lightweight, fast, and distraction-free alternatives that still offer professional-grade reliability and speed.

## Vision
To demonstrate high-performance software architecture through a minimalist application that balances simplicity with scalability. Ideally, this becomes a production-ready foundation for future Micro SaaS projects.

## Target Users

| Persona | Description | Primary Goal | Pain Points |
|---------|-------------|--------------|-------------|
| The Solopreneur | Single-person business owner | Focus on high-impact daily tasks | Overwhelmed by "team" features in other tools |
| The Minimalist | Efficiency-focused individual | Distraction-free environment | UI clutter, slow load times, excessive notifications |
| The Developer | (Self) Future SaaS builder | Reusable, clean code foundation | Wasting time rewriting auth/CRUD boilerplates |

## Business Objectives

| Objective | Success Metric | Target | Timeline |
|-----------|----------------|--------|----------|
| Code Quality | Unit Test Coverage (Core Logic) | > 80% | MVP Launch |
| Performance | API Read Response Time | < 100ms | MVP Launch |
| Reliability | SonarQube Critical Issues | 0 | Continuous |
| Reusability | Setup Time Reduction for Next App | 50% | Post-MVP |

## Constraints

| Type | Description |
|------|-------------|
| **Time** | 4 Weeks (MVP ready for deployment) |
| **Budget** | Bootstrapped (< $10/mo); Hetzner VPS or Free Tier (Supabase/Vercel) |
| **Backend** | NestJS (Node.js) with strict Clean Architecture |
| **Frontend** | Next.js (React) focusing on component reusability |
| **Database** | PostgreSQL |
| **Tools** | Docker, GitHub Actions, Swagger/OpenAPI |

## Scope

### In Scope (MVP & Boilerplate Core)
- ✅ **Secure Auth:** Email/Password with JWT (Access + Refresh Token flow).
- ✅ **Task CRUD:** Create, Edit, Delete, Mark Complete/Incomplete.
- ✅ **Organization:** Lists/Projects, Priorities (Low/Med/High).
- ✅ **Smart Views:** "Today" filtered view, basic Search & Sort.
- ✅ **Architecture:** Database/Service/Controller separation (Clean Arch).
- ✅ **Base Entities:** Standardized schemas (timestamps, soft deletes).
- ✅ **Data Isolation:** User-centric queries (`WHERE user_id = ?`).
- ✅ **Core Infra:** Global error handling, logging, Docker setup.

### Out of Scope
- ❌ Recurring tasks, Sub-tasks, File attachments.
- ❌ Team collaboration (Sharing, Comments, Assignments).
- ❌ Third-party integrations (Google Calendar, Email).
- ❌ UI Extras: Drag-and-drop, Dark Mode toggle.
- ❌ Social Login (OAuth).
- ❌ Billing/Payment integration.

## Success Criteria
How we know MVP is successful:
1.  **Functional:** A user can register, log in, create a task list, and filter by "Today" without errors.
2.  **Technical:** The codebase passes all CI/CD checks (linting, testing) and deploys successfully to the target environment.
3.  **Architectural:** The modules are decoupled enough that the "Task" module could be swapped for another domain without rewriting Auth or Base entities.

---
**Version:** 1.0
**Created:** Sat Jan 24 2026
**Status:** Active
