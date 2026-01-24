# API Spec: [Endpoint Group Name]

**Story:** [Parent Story]  
**Created:** [Date]

---

## Endpoints

### [METHOD] /v1/[resource]

**Purpose:** [What this endpoint does]

**Auth:** Required / Public

**Request:**
```typescript
// Body (for POST/PUT/PATCH)
{
  fieldName: string      // required, description
  optionalField?: number // optional, description
}

// Query (for GET with filters)
{
  page?: number          // default: 1
  perPage?: number       // default: 20
  search?: string        // search by name
}
```

**Response (2xx):**
```typescript
{
  data: {
    id: string
    fieldName: string
    // ... all returned fields
  }
}

// For list endpoints:
{
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}
```

**Errors:**

| Code | Condition | Response |
|------|-----------|----------|
| 400 | Validation failed | `{ error: { code: "VALIDATION_ERROR", message: "...", details: [...] } }` |
| 404 | Resource not found | `{ error: { code: "NOT_FOUND", message: "..." } }` |
| 409 | Duplicate/Conflict | `{ error: { code: "CONFLICT", message: "..." } }` |

---

## Implementation Tasks

- [ ] [P] Create DTO file(s)
- [ ] [P] Create/update service methods
- [ ] Create controller endpoint (depends on service)
- [ ] Register route in module
- [ ] Update API_CONTRACTS.md (if new pattern)

**[P] = Parallel task (no dependencies)**

---

## File Locations

| File | Path |
|------|------|
| Controller | `src/modules/[module]/controllers/[name].controller.ts` |
| Service | `src/modules/[module]/services/[name].service.ts` |
| DTO | `src/modules/[module]/dto/[action]-[name].dto.ts` |

---

## Embedded Patterns (from API_CONTRACTS.md)

### Response Wrapper
```typescript
// Single item
{ data: T }

// List with pagination
{ data: T[], meta: { total, page, perPage, totalPages } }

// Error
{ error: { code: string, message: string, details?: any } }
```

### Validation
- Use class-validator decorators
- Return 400 with details array for validation errors

### Naming Conventions
- Controller: `[Name]Controller`
- Service: `[Name]Service`
- DTO: `Create[Name]Dto`, `Update[Name]Dto`

---

## Checklist Before Handoff

- [ ] All endpoints specified with method + path
- [ ] Request body/query documented
- [ ] Response structure documented
- [ ] Error cases listed
- [ ] File paths are project-specific
- [ ] Patterns match existing API_CONTRACTS.md
