## Session: API_DESIGN
- Status: In Progress
- Last Updated: Sat Jan 24 2026

## Base Config
- Path: /api/v1 (Implied by routes constant)
- Auth: JWT (Access + Refresh)

## Response Format (SwaggerHelper compliant)

### Success
```json
{
  "status": {
    "code": 200,
    "message": "Success"
  },
  "data": { ... }
}
```
*Correction: The helper actually generates the Swagger example structure, but the runtime response structure inferred from `success` method seems to wrap the example in `value`. Wait, `SwaggerHelpers.success` returns the Swagger Schema Object. The actual runtime response likely matches the `value` property.*

Let's look at `value` in `success()`:
```json
{
  "value": example
}
```
So for `SwaggerHelpers.success(200, { id: 1 })`, the response is just `{ id: 1 }`?
No, wait. The `validationError` helper shows a specific structure:
```json
{
  "status": { "code": 400, "message": "Bad Request" },
  "error": { "code": 100400, "message": "...", "errors": ... },
  "path": "...",
  "timestamp": "..."
}
```
This implies a **Global Interceptor** is formatting responses.
I need to check `global-serializer.interceptor.ts` if possible, or assume the standard format from the `validationError` example is the target for Errors.

For Success, the `paginated` helper constructs:
```json
{
  "items": [...],
  "meta": { ... },
  "links": { ... }
}
```
So a standard success response is likely just the data object itself, or wrapped if paginated.

Let's check `paginated` output structure again:
```json
{
  "items": T[],
  "meta": { "totalItems": number, ... },
  "links": { "first": string, ... }
}
```

And for `validationError`:
```json
{
  "status": { "code": 400, ... },
  "error": { "code": 100400, ... }
}
```

This means **Success** and **Error** schemas are different.
- **Success:** Direct Data Object (or `{ items, meta, links }` for lists).
- **Error:** Wrapped Envelope `{ status, error, path, timestamp }`.

I will update the scratchpad to reflect this precise structure.

## Revised Response Formats

### Success (Single)
Direct Return of DTO/Entity.
```json
{
  "id": "...",
  "title": "..."
}
```

### Success (Paginated)
```json
{
  "items": [ ... ],
  "meta": {
    "totalItems": 100,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 10,
    "currentPage": 1
  },
  "links": {
    "first": "...",
    "previous": "...",
    "next": "...",
    "last": "..."
  }
}
```

### Error
```json
{
  "status": {
    "code": 400,
    "message": "Bad Request"
  },
  "error": {
    "code": 100400,
    "message": "Validation failed",
    "errors": {
      "email": ["Invalid email format"]
    }
  },
  "path": "/api/v1/auth/login",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Ready for Generation: Yes