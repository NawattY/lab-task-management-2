# Entity Spec: [EntityName]

**Story:** [Parent Story]  
**Created:** [Date]

---

## Entity Definition

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| id | UUID | Yes | auto | Primary key |
| [fieldName] | [Type] | [Yes/No] | [default] | [notes] |
| createdAt | DateTime | Yes | now() | Timestamp |
| updatedAt | DateTime | Yes | auto | Auto-update |

---

## Enums

| Enum Name | Values | Notes |
|-----------|--------|-------|
| [EnumName] | VALUE_1, VALUE_2 | [usage notes] |

---

## Relations

| Relation | Type | Target Entity | Cascade | Notes |
|----------|------|---------------|---------|-------|
| [relationName] | 1:N / N:1 / N:N | [Entity] | Delete/Restrict/SetNull | [notes] |

---

## Validation Rules

| Field | Rule | Message |
|-------|------|---------|
| [fieldName] | required, max(200) | "Field is required" |

---

## Implementation Tasks

- [ ] [P] Create entity file
- [ ] [P] Add to Prisma schema (if using Prisma)
- [ ] Run migration/generate (sequential, after schema)
- [ ] Update DOMAIN_MODEL.md (if new entity)

**[P] = Parallel task (no dependencies)**

---

## File Locations

| File | Path |
|------|------|
| Entity | `src/modules/[module]/entities/[entity].entity.ts` |
| BaseEntity | `src/common/base.entity.ts` |
| Prisma Schema | `prisma/schema.prisma` |

---

## Embedded Context (from DOMAIN_MODEL.md)

### Existing Related Entities
[Copy relevant entity definitions here]

### Naming Conventions
- Entity: PascalCase (e.g., `CheckupProgram`)
- Fields: camelCase (e.g., `nameTh`)
- Enums: UPPER_SNAKE_CASE values

---

## Checklist Before Handoff

- [ ] All fields defined with types
- [ ] All relations specified with cascade behavior
- [ ] All validations listed
- [ ] File paths are project-specific
- [ ] Naming follows existing patterns
