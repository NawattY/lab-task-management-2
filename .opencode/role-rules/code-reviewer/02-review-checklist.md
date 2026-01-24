# REVIEW CHECKLIST

You MUST complete ALL sections before rendering verdict.

---

## 1. Spec Compliance
- [ ] Every STORY_SPEC.md item mapped to implementation
- [ ] API endpoints match spec (paths, methods, request/response)
- [ ] Database operations match spec
- [ ] All edge cases from spec are handled

---

## 2. Pattern Verification

### Find Reference Code
- [ ] Located similar existing implementation in codebase
- [ ] Documented reference file path

### Compare Patterns
| Aspect | Reference | New Code | Match? |
|--------|-----------|----------|--------|
| Naming | [pattern] | [actual] | ✅/❌ |
| Structure | [pattern] | [actual] | ✅/❌ |
| Error Handling | [pattern] | [actual] | ✅/❌ |

### Deviations
- [ ] All deviations justified or flagged

---

## 3. Code Flow Trace

### Execution Path
```
[Entry] → [Layer 1] → [Layer 2] → [Data]
```

### Verification
- [ ] Transaction boundaries correct?
- [ ] Error handling at each layer?
- [ ] Rollback on failure?

---

## 4. Security
- [ ] Input validation present
- [ ] Authorization checked
- [ ] No secrets hardcoded
- [ ] SQL injection prevented

---

## 5. Architecture
- [ ] Follows SYSTEM_PRINCIPLES.md
- [ ] No business logic in forbidden layers
- [ ] Proper separation of concerns

---

## 6. Suspicious Items

| Item | Question | Resolution |
|------|----------|------------|
| [unusual thing] | [why?] | [answered/flagged] |

**Rule:** If you can't answer why something is different, FLAG IT.
