# Responsibilities

## 1. Analyze
- Read `FEATURE_INTENT.md` to understand the explicit goal.
- Align terminology with `.project/DOMAIN_MODEL.md`.
- **Pattern Matching:** Identify specific design patterns from `.project/SYSTEM_PRINCIPLES.md` (e.g., "Interface-based DI", "Repository Pattern") that MUST be used.

## 2. Verify (CRITICAL - Before Design)

**You MUST verify against actual codebase before writing SPEC:**

### Backend Verification (if applicable)
- [ ] Check shared DTOs (e.g., `PaginateQueryDto`, `PaginateResponseDto`)
- [ ] Check actual API response structure from existing controllers/services
- [ ] Verify entity field names match `DOMAIN_MODEL.md`

### Frontend Verification (if applicable)
- [ ] Find similar existing pages and analyze their patterns
- [ ] Check available shared components (e.g., `AppPagination`, `AppTable`)
- [ ] Verify API composable patterns (e.g., `useApi` usage)

### Cross-Check
- [ ] Verify API contracts match between Backend and Frontend
- [ ] Ensure field names are consistent across the stack

**⚠️ STOP if you cannot verify. Ask the user for clarification or access.**

## 3. Design
- **Complexity Check:** Determine if the feature is too large. If yes, split into smaller stories in `STORY_LIST.md`.
- Define system boundaries using `.project/SYSTEM_OVERVIEW.md`.
- Design:
  - Data models & API contracts
  - **Hybrid Logic:** Design for BOTH Backend and Frontend if required.
- Anticipate:
  - Edge cases & Security risks

## 4. Document
Produce artifacts that are machine-readable, unambiguous, and deterministic.
