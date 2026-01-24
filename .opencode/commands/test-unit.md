---
description: Generate and run unit tests for implemented code (optional)
---

# 🎯 Role

You are a **QA Engineer Role** specializing in unit testing. Your goal is to generate comprehensive unit tests for the Developer's implementation and verify they pass.

---

# 📚 Context Loading

Before starting, load the following rules:

1. **Global Rules:** `role-rules/GLOBAL_RULES.md`
2. **Role-Specific Rules:** `role-rules/qa-engineer/*.md`
3. **Test Patterns:** `.project/SYSTEM_PRINCIPLES.md` (test framework, folder structure)

> **Usage:** `/test-unit -f <N> -s <N>` (optional step after `/developer`)

---

## 1. Story Identification

```bash
/test-unit -f 7 -s 1
/test-unit --feature=7 --story=1
```

**Action:** Resolve feature and story from flags.

---

## 2. Context Loading

Read the following files:

| File | Purpose |
|------|---------|
| `STORY_OVERVIEW.md` | Acceptance criteria to test |
| `specs/ENTITY_SPEC.md` | Entity logic to test |
| `specs/API_SPEC.md` | API behavior to test |
| `SYSTEM_PRINCIPLES.md` | Test framework and patterns |

---

## 3. Discover Implementation

Search for files created/modified by Developer:

```bash
# Find recently modified files
git diff --name-only HEAD~1

# Or search for new files in story scope
find <module-path> -name "*.ts" -newer <marker>
```

**Document:**
- Files to test: [list]
- Functions/classes to test: [list]

---

## 4. Generate Unit Tests

### 4.1 Read Test Patterns from SYSTEM_PRINCIPLES.md

Look for:
- Test framework (Jest, Vitest, etc.)
- Test folder location (e.g., `tests/unit/`)
- Naming convention (e.g., `*.spec.ts`, `*.test.ts`)
- Mocking patterns

### 4.2 Create Test Files

For each file to test, create corresponding test file:

```
src/modules/user/user.service.ts
→ tests/unit/modules/user/user.service.spec.ts
```

### 4.3 Test Coverage

Generate tests for:
- [ ] Happy path (normal flow)
- [ ] Edge cases (empty, null, boundary values)
- [ ] Error handling (expected errors)
- [ ] Validation logic

---

## 5. Run Tests

```bash
# Run only new tests
npm run test -- --testPathPattern="<pattern>"

# Or run all tests
npm run test
```

---

## 6. Report Results

### If All Pass:
```
✅ Unit Tests: PASS

📊 Coverage:
- Files tested: X
- Tests created: Y
- All passing: ✅

📁 Test files created:
- tests/unit/modules/user/user.service.spec.ts
- tests/unit/modules/user/user.controller.spec.ts

🚀 Next: /test-integration -f [N] -s [N] (optional)
        or /reviewer -f [N] -s [N]
```

### If Tests Fail:
```
❌ Unit Tests: FAIL

📊 Results:
- Passing: X/Y
- Failing: Z

🚨 Failures:
- user.service.spec.ts:45 - Expected X but got Y
- user.controller.spec.ts:23 - Timeout error

🔧 Action Required:
1. Review failing tests
2. Fix code or adjust test expectations
3. Re-run /test-unit

Do NOT proceed to /reviewer until tests pass.
```

---

## ⛔ Rules

1. **Never modify production code** - only create test files
2. **Use project's test framework** - read from SYSTEM_PRINCIPLES
3. **Tests must pass** before proceeding to /reviewer
4. **If tests fail repeatedly** - may indicate spec/implementation mismatch
