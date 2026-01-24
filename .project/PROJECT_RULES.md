# Project Rules

> **Project-specific development rules.** Base rules are in `.opencode/role-rules/GLOBAL_RULES.md` Section 4.

---

## 1. Guiding Principles

1.  **The Plan is the Source of Truth:** All work must be tracked in Story specs. No code is written without a clear plan.
2.  **Test-Driven Development (TDD):** Tests are written *before* implementation code. This ensures testability and clarifies requirements.
3.  **Documentation-First:** API contracts (DTOs, Swagger) and Module READMEs are defined before business logic is implemented.
4.  **UX-First:** User experience (performance, responsiveness, clarity) drives technical decisions, not the other way around.

---

## 2. Quality Gates

Before marking a story complete, verify:

> **Base checklist:** See `.opencode/role-rules/GLOBAL_RULES.md` Section 4.4

**Project-specific additions:**

- [ ] **Code coverage ≥ 80%** (Run `npm run test:cov` to verify).
- [ ] **JSDoc required for ALL functions** (public AND private).
    - *Why?* To ensure maintainability for future developers/agents.
- [ ] **Strict Type Safety:** Zero usage of `any`. Strict null checks enabled.
- [ ] **Linting:** Zero warnings from ESLint/Prettier.

---

## 3. Commit Guidelines

### Message Format
```
<type>(<scope>): <description>
```

### Types
| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `build` | Changes that affect the build system or external dependencies |
| `ci` | Changes to our CI configuration files and scripts |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

### Examples
```bash
git commit -m "feat(auth): add jwt strategy and guards"
git commit -m "fix(task): correct date sorting in findAll"
git commit -m "docs(api): update swagger response examples"
git commit -m "test(user): add coverage for delete user flow"
```

### Scope
Use the module or layer name as the scope:
- `auth`, `user`, `task` (Modules)
- `core`, `shared` (Shared libs)
- `db`, `prisma` (Database)
- `ui`, `components` (Frontend)

---

**Version:** 1.0
**Created:** Sat Jan 24 2026
**Status:** Active
