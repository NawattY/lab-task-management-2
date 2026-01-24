## Session: PROJECT_BRIEF
- Status: In Progress
- Last Updated: Sat Jan 24 2026

## Captured Information
### Problem
- Users feel overwhelmed by complex, feature-bloated project management tools.
- Need: Track daily priorities without distraction.

### Users
- Solopreneurs
- Freelancers
- Minimalists
- Need distraction-free environment for execution.

### Confidence
- Growing trend toward "digital minimalism".
- Demand for single-purpose, lightweight alternatives to Jira/Trello.

### Vision & Purpose
- Mission: To demonstrate high-performance software architecture through a minimalist application that balances simplicity with scalability.
- Success (6mo): Production-ready NestJS backend + optimized frontend. Reusable 'core engine' for future Micro SaaS projects.

### Objectives
- Metrics: >80% Unit Test coverage (core logic), <100ms API read response, 0 Critical SonarQube issues.
- Success Def: Codebase modularity enables use as "Micro SaaS Boilerplate" (reduces future setup by 50%).

### Constraints
- Time: 4 weeks (MVP).
- Budget: Bootstrapped (<$10/mo). Use Hetzner VPS or Free Tiers (Supabase/Vercel).
- Tech Stack:
    - Backend: NestJS (Clean Architecture).
    - Frontend: Next.js (React).
    - DB: PostgreSQL.
    - Tools: Docker, GitHub Actions, Swagger/OpenAPI.

### Scope
- [notes]

### Constraints
- [notes]

### Scope
- In Scope (MVP):
    - Auth: Email/Pass with JWT (Access + Refresh).
    - Task CRUD: Create/Edit/Delete/Complete.
    - Org: Lists/Projects, Priorities (L/M/H).
    - Views: "Today" view, Search, Sort by date.
    - Arch Essentials: Clean Architecture modules, Base Entity (timestamps, soft delete), User-centric data isolation, Global Error Handling/Logging.
- Out of Scope:
    - Recurring/Sub-tasks/Attachments.
    - Team/Collaboration features.
    - Integrations (Calendar/Email).
    - Drag-and-drop, Dark Mode toggle.
    - Social Auth (OAuth).
    - Billing/Payments.

## Ready for Generation: Yes
