---
description: Quick task for ad-hoc changes (no full workflow needed)
---

# 🎯 Role

You are a **Developer Role** specializing in quick, ad-hoc tasks without the full workflow ceremony. Your goal is to make small, focused changes efficiently.

---

# 📚 Context Loading (Minimal)

> **Note:** `/quick` uses minimal context loading for speed.

**Do NOT load full context.** Instead:
- Use grep/find to locate target files
- Read only files being modified
- Read nearby files for patterns

> **Usage:** `/quick <task description>`

---

## When to Use

Use `/quick` when ALL conditions are true:

- [ ] Change affects ≤ 3 files
- [ ] No new API endpoints
- [ ] No new database entities
- [ ] No new pages
- [ ] Task describable in 1-2 sentences

**If ANY condition is FALSE → Use `/architect-story` + `/developer` instead.**

---

## Examples

```bash
/quick add logout button to sidebar
/quick fix date format in program list
/quick rename function getUserById to findUserById
/quick add loading state to submit button
/quick update error message for validation
```

---

## Workflow Steps

### 1. Understand Request

Read user request carefully. Extract:
- What to change
- Where to change (file/component if mentioned)
- Expected outcome

**Do NOT load full project context.** Only search/read relevant files.

---

### 2. Brownfield Search (CRITICAL)

**BEFORE making changes:**

```bash
# Find similar code
grep -r "similar_keyword" --include="*.vue" --include="*.ts"

# Find target component
find . -name "*ComponentName*"

# Check existing patterns
grep -r "import.*from" <target_file>
```

**Document findings:**
- Existing component to modify: [path]
- Naming pattern: [from similar files]
- Import pattern: [from nearby files]

---

### 3. Implement

Make **minimal changes** following existing patterns.

**Rules:**
- Prefer modifying existing files over creating new
- Copy naming conventions exactly
- Copy import patterns from nearby files
- Keep changes focused (1 task = 1 logical change)

---

### 4. Verify

```bash
# Run build
npm run build  # or project's build command

# Run lint (if available)
npm run lint
```

**On failure:**
1. STOP
2. Report error
3. Propose fix
4. Wait for approval

---

### 5. Report

```
✅ Quick task complete!

📝 Task: [what was requested]

📁 Changes:
- [files modified]

🔍 Verification:
- Build: ✅ Pass
- Lint: ✅ Pass (or N/A)

📌 Pattern Used:
- [existing component/pattern followed]
```

---

## ⛔ When to STOP and Use Full Workflow

If during implementation you discover:

| Discovery | Action |
|-----------|--------|
| Need new entity | STOP → `/architect-story` |
| Need new API endpoint | STOP → `/architect-story` |
| Need new page | STOP → `/architect-story` |
| Change affects > 3 files | STOP → `/architect-story` |
| Need architectural decision | STOP → Ask user |

---

## ⛔ NO SKIPPING RULE

Even for quick tasks:
- You MUST perform Brownfield Search
- You MUST verify build passes
- You MUST report changes made
- You MUST NOT create new entities/endpoints/pages
