# Required Output Artifacts

All artifacts MUST be generated inside the feature folder.

> **Naming:** Features use `<N>-<name>` format (e.g., `1-auth`, `2-payments`)

---

### Feature-Level (`/architect-feature`)
Generate in `.project/features/<N>-<feature>/`:

1. **FEATURE_OVERVIEW.md** - High-level design context
2. **STORY_LIST.md** - List of stories with status

### Story-Level (`/architect-story "<name>"`)
Generate in `.project/features/<N>-<feature>/stories/<story>/`:

1. **STORY_SPEC.md** (~100-150 lines)
   - Scope definition
   - Backend: Entities, API endpoints, validation
   - Frontend: Files, user flow, components
   - Edge cases
   - Acceptance criteria
