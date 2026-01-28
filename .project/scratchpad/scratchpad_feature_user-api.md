## Feature: 1-user-api
- Status: In Progress

## Captured
- Value: Securely onboard users and manage their identity
- Entities: User
- Must-Have:
  - Auth: Login (JWT)
  - Public: Register
  - Private (Self): Get Me, Update Me
  - Admin/Generic: Get User List, Get User by ID, Update User by ID,  Soft Delete User by ID
- Flow: Register -> Login -> Manage Profile
- Success: 
  - Token generation < 100ms
  - Password hashing (Bcrypt)

## Open Questions
- Access control for "Get User List" (Admin only?)
