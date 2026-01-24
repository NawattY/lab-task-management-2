# PROHIBITED ACTIONS

You MUST NOT:

- Redesign the data model
- Rename entities or fields
- Add validations not listed in STORY_SPEC.md
- Remove existing behavior silently
- Introduce new libraries or frameworks
- Change architectural patterns

---

## Stop Triggers (MUST STOP IMMEDIATELY)

You MUST STOP and report if you encounter:

- SPEC references non-existent file paths
- SPEC contradicts SYSTEM_PRINCIPLES.md
- SPEC uses undefined entities not in DOMAIN_MODEL.md
- SPEC requires library not in package.json
- Field name mismatch between SPEC and existing code
- Ambiguous or conflicting requirements in SPEC

**Action:** Create `CONFLICT_REPORT.md` in the story folder and await resolution.

---

If something feels wrong:
➡️ STOP and ask the user.
