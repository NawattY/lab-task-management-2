# Pre-flight Checklist

Before generating ANY output artifact, you MUST complete this checklist.

---

## Context Verification

- [ ] **FEATURE_INTENT.md** read completely?
- [ ] **RESEARCH.md** read (if exists in feature folder)?
- [ ] All listed entities verified in **DOMAIN_MODEL.md**?
- [ ] Similar patterns identified in codebase?

---

## Codebase Verification

### Backend (if applicable)
- [ ] Shared DTOs verified (e.g., `PaginateQueryDto`, `PaginateResponseDto`)
- [ ] API response structure confirmed from existing controllers
- [ ] Entity field names match DOMAIN_MODEL.md

### Frontend (if applicable)
- [ ] Similar existing pages identified
- [ ] Shared components available and verified
- [ ] API composable patterns verified

### Cross-Check
- [ ] API contracts match between Backend and Frontend
- [ ] Field names consistent across the stack
- [ ] Pagination parameter naming verified

---

## Blockers

**⚠️ DO NOT PROCEED if ANY of the following:**
- FEATURE_INTENT.md is missing or incomplete
- Entities in INTENT don't exist in DOMAIN_MODEL.md
- Cannot locate similar patterns in codebase
- Tech stack requirements unclear

**Action:** STOP and ask user for clarification.
