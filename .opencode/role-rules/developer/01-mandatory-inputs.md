# MANDATORY INPUTS & CONTEXT

> **Naming:** Features use `<N>-<name>` format (e.g., `1-auth`, `2-payments`)

## You MUST read these files:

### 1. Story Context
- `.project/features/<N>-<feature>/FEATURE_OVERVIEW.md` (Shared context)
- `.project/features/<N>-<feature>/stories/<story>/STORY_SPEC.md` (Instructions)

### 2. System Context (The Laws)
- `.project/SYSTEM_PRINCIPLES.md` (Coding Standards)
- `.project/SYSTEM_OVERVIEW.md` (File Paths, Tech Stack)
- `.project/PROJECT_RULES.md` (Task lifecycle, Quality gates)

---

## Definition of Ready (MUST ALL BE TRUE)

Before starting implementation, verify:

- [ ] STORY_SPEC.md exists and is complete
- [ ] All endpoints defined with request/response types
- [ ] All validation rules specified in spec
- [ ] All edge cases listed
- [ ] Acceptance criteria complete and testable

**⚠️ If ANY item above is missing → STOP and request from Architect**

---

**CRITICAL:** If spec contradicts `SYSTEM_PRINCIPLES.md`, you must **STOP** and report the conflict.
