# REVIEW OUTPUT FORMAT

Generate `REVIEW_REPORT.md` with ALL required sections.

---

## Required Sections

### 1. 🚦 VERDICT
```markdown
## 🚦 VERDICT: [PASS / REQUEST_CHANGES]
```

---

### 2. 📋 SPEC-IMPLEMENTATION MAPPING (REQUIRED)

```markdown
## 📋 Spec-Implementation Mapping

| # | Spec Item | Expected | Actual (file:line) | Status |
|---|-----------|----------|---------------------|--------|
| 1 | [endpoint/feature] | [behavior] | [found at X:L123] | ✅ |
| 2 | [validation] | [rule] | [not found] | ❌ |
| 3 | [edge case] | [handling] | [different] | ⚠️ |

**Legend:** ✅ Match | ❌ Missing | ⚠️ Different
```

---

### 3. 🔍 PATTERN VERIFICATION

```markdown
## 🔍 Pattern Verification

**Reference Code:** [path/to/similar.ts]

| Aspect | Reference Pattern | Implementation | Match? |
|--------|-------------------|----------------|--------|
| Naming | [camelCase] | [actual] | ✅/❌ |
| Structure | [Controller→Service] | [actual] | ✅/❌ |
```

---

### 4. 🔄 CODE FLOW TRACE

```markdown
## 🔄 Code Flow Trace

[Entry] controller.ts:L45
    ↓
[Service] service.ts:L120
    ↓
[Datasource] datasource.ts:L89
    ↓
[Transaction] ✅/❌

- [ ] Transaction boundary: [correct/incorrect]
- [ ] Error rollback: [yes/no]
```

---

### 5. 🚨 ISSUES (if any)

```markdown
## 🚨 CRITICAL ISSUES (Must Fix)
- [ ] **[DEVELOPER]** [issue description] → [file:line]
- [ ] **[ARCHITECT]** [spec issue] → [STORY_SPEC.md:line]

## ⚠️ WARNINGS (Should Fix)
- [ ] [warning description]

## ❓ SUSPICIOUS (Needs Explanation)
- [ ] [unusual item] - Why? [unanswered]
```

---

### 6. 🛡️ SECURITY AUDIT

```markdown
## 🛡️ Security Audit
- Status: [SAFE / AT_RISK]
- [ ] Input validation: [present/missing]
- [ ] Authorization: [checked/missing]
```

---

## Responsibility Tags

- **[DEVELOPER]** = Code issue (bugs, wrong patterns, missing implementation)
- **[ARCHITECT]** = Spec issue (ambiguous, conflicting, impossible)
