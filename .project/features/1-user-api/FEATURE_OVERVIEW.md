# Feature: User API & Authentication

## Summary
Implements the core identity management system. Allows users to authenticate via JWT, manage their own profiles, and enables Administrators to create and manage user accounts securely. This feature enforces the "Isolation" principle and the "Inbox" creation business rule.

## Entities Involved
| Entity | Role |
|--------|------|
| **User** | **Create** (Admin only), **Read/Update** (Self/Admin), **Soft Delete** (Admin/Self) |
| **Collection** | **Create** (System creates default "Inbox" on User creation) |

## API Base Path
- `/api/v1/auth`
- `/api/v1/users`

## Shared Patterns
- **Pagination:** Standard `PageOptionsDto` (page, take, order) → `PageDto` response.
- **Auth:** JWT Guard (Access Token) required for all non-public endpoints.
- **Roles:** `RolesGuard` with `@Roles(Role.ADMIN)` for administrative endpoints.
- **Soft Delete:** `deletedAt` filtering in Repositories.
