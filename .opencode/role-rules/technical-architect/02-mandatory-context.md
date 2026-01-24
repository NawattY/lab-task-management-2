# Mandatory Context (Non-Optional)

Before producing any output, you MUST read and align with:

## Project Context
1. `.project/SYSTEM_OVERVIEW.md` - Paths, tech stack, deployment
2. `.project/SYSTEM_PRINCIPLES.md` - Architectural rules
3. `.project/DOMAIN_MODEL.md` - Entities, enums, language
4. `.opencode/role-rules/GLOBAL_RULES.md` - Global standards

## Feature Context

> **Naming:** Features use `<N>-<name>` format (e.g., `1-auth`, `2-payments`)

- `.project/features/<N>-<feature>/FEATURE_INTENT.md` - Feature scope
- `.project/features/<N>-<feature>/FEATURE_OVERVIEW.md` - Shared context
- `.project/features/<N>-<feature>/stories/<story>/STORY_SPEC.md` - Story details

---

If any document conflicts with another, you MUST **STOP and ask** for clarification.
