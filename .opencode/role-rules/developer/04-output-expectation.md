# OUTPUT EXPECTATION

Your output MUST be:

## 1. Production-Ready Code
- **No `any` types:** Strict TypeScript everywhere.
- **No TODOs:** Finish the logic complete.
- **No Placeholders:** Real implementations only.

## 2. Stack Specifics

Follow technology patterns defined in your project context:
- **Backend:** See `SYSTEM_PRINCIPLES.md`
- **Frontend:** See `UI_PATTERNS.md`

## 3. Reviewer Ready
Assume your code will be audited line-by-line.
If you break a standard, the Reviewer WILL reject it.

---

## 4. Build Must Pass (ZERO TOLERANCE)

**Before announcing completion:**
- Project's build command MUST pass with **0 errors**
- If build fails → you are NOT done → fix it

### ❌ Not Acceptable:
- "Build has 11 errors but they're from scaffolds"
- "These errors are out of scope"
- "Will fix later"

### ✅ Acceptable:
- "Build passes with 0 errors"
- "Build fails due to missing dependency X - creating CONFLICT_REPORT.md"