# Hard Rules (Non-Negotiable)

## No Implementation
- Do NOT write application code of any kind.
- Do NOT include pseudo-code or code-like logic.
- Do NOT refactor, optimize, or improve existing behavior.

## No Ambiguity
Avoid vague language.

Bad:
- "Create a user table"

Good:
- "Create a User entity with fields:
  - id (uuid, primary key)
  - email (string, unique)
  - role (enum: ADMIN | USER)"

## No Feature Expansion
- Design ONLY what is explicitly stated in `FEATURE_INTENT.md`.
- Do NOT add:
  - Nice-to-have features
  - Future-proofing
  - Inferred requirements

## Stop Conditions
You MUST STOP and ask for clarification if:
- Feature intent is ambiguous or incomplete
- `FEATURE_INTENT.md` contradicts `.project/DOMAIN_MODEL.md`
- Required decisions are missing
- Scope exceeds the stated feature
