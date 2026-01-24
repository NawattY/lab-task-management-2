# API Contracts — Task Management System

## 1. Base Configuration

| Setting | Value |
|---------|-------|
| Base Path | `/api/v1` |
| Versioning | URL-based (`/v1/...`) via `app-routes.constant.ts` |
| Documentation | Swagger at `/api/docs` |
| Content-Type | `application/json` |

## 2. Authentication

| Setting | Value |
|---------|-------|
| Method | JWT Bearer Token |
| Access Token | Header: `Authorization: Bearer {token}` |
| Refresh Token | **HttpOnly Cookie** (Secure, SameSite=Strict) |
| Access Expiry | 15 minutes (env JWT_ACCESS_EXPIRES_IN=15m) |
| Refresh Expiry | 7 days (env JWT_REFRESH_EXPIRES_IN=7d) |

## 3. Response Formats

> **Reference:** `src/shared/swagger/swagger.helpers.ts`

### 3.1 Success Response (Single Resource)
Returns the resource object directly.

```json
{
  "id": "uuid",
  "title": "Task Title",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.2 Success Response (Paginated)
Returns a wrapped object with metadata and links.

```json
{
  "items": [
    { "id": "1", "title": "Task 1" },
    { "id": "2", "title": "Task 2" }
  ],
  "meta": {
    "totalItems": 100,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 10,
    "currentPage": 1
  },
  "links": {
    "first": "/api/v1/tasks?page=1&perPage=10",
    "previous": "",
    "next": "/api/v1/tasks?page=2&perPage=10",
    "last": "/api/v1/tasks?page=10&perPage=10"
  }
}
```

### 3.3 Error Response
Standardized envelope for all errors (4xx, 5xx).

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
      "email": ["email must be an email address"],
      "password": ["password is not strong enough"]
    }
  },
  "path": "/api/v1/auth/register",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 4. HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful operation |
| 201 | Created | Resource successfully created |
| 400 | Bad Request | Validation failure (Code: `100400`) |
| 401 | Unauthorized | Invalid/Missing Token (Code: `101401`) |
| 403 | Forbidden | Valid token, no permission (Code: `101403`) |
| 404 | Not Found | Resource not found (Code: `100404`) |
| 409 | Conflict | Duplicate entry (Code: `102409`) |
| 500 | Server Error | Unhandled exception (Code: `100500`) |

## 5. Query Parameters

| Pattern | Example | Description |
|---------|---------|-------------|
| **Pagination** | `?page=1&perPage=10` | Standard pagination |
| **Sorting** | `?sort=createdAt:desc` | Field:Direction |
| **Filtering** | `?filter[status]=active` | Field specific filtering |
| **Search** | `?search=keyword` | General text search |

## 6. Rate Limiting

| Tier | Limit | Window |
|------|-------|--------|
| Anonymous | 30 req | 1 minute |
| Authenticated | 100 req | 1 minute |

---
**Version:** 1.0
**Created:** Sat Jan 24 2026
**Status:** Active
