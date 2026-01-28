# Feature Intent: User API & Authentication

**Feature ID:** 1-user-api  
**Created:** Wed Jan 28 2026  
**Status:** Planning

---

## Purpose

To provide secure entry points for users to authenticate, while restricting account creation to Administrators for controlled onboarding.

---

## User Value

**Primary Benefit:**
Admins can centrally manage user access, while users can securely log in and manage their own profiles without public registration exposure.

**Target Users:**
- **Admin:** Needs to create and manage user accounts.
- **User:** Needs secure access to their own account.

---

## Scope

### Must Have (MVP)

#### 1. Authentication (Public)
- **Login:** Validate credentials and return Access + Refresh Tokens (JWT).

#### 2. User Management (Self)
- **Get Me:** Retrieve own profile details.
- **Update Me:** Modify own profile (Name, etc.).
- **Update My Password:** Allow user to change their password.

#### 3. Administrative Management (Admin Role)
- **Create User:** Create a new user account (Admin sets initial email/password).
- **Get User List:** View all registered users (Paginated).
- **Get User by ID:** View specific user details.
- **Update User by ID:** Modify any user's profile.
- **Delete User by ID:** Soft delete any user (Cannot delete self).

### Won't Have (MVP)
- Public Registration (`POST /auth/register`).
- Email Verification / Activation.
- Social Login (OAuth).
- Password Reset flow (Forgot Password).
- Hard Deletion (GDPR Right to Erasure - deferred).

---

## User Flow (Happy Path - Admin Creates User)

**Entry Point:** `POST /users` (Requires Admin Token)

**Steps:**
1. **Admin** submits Email, Password, and Name for the new user.
2. System validates format and uniqueness of Email.
3. System hashes password using Bcrypt.
4. System creates User record in database.
5. System creates default "Inbox" Collection for the new user (Business Rule #1).

**Outcome:** User is created and can login with the credentials provided by the Admin.

---

## Technical Requirements

### Database Entities (from DOMAIN_MODEL.md)

| Entity | Operations | Notes |
|--------|------------|-------|
| **User** | Create, Read, Update, Soft Delete | Creation restricted to Admin |
| **Collection** | Create | Default "Inbox" creation on User Create |

### Security & Roles
- **Guest:** Can access Login ONLY.
- **User:** Can access "Me" endpoints.
- **Admin:** Can access "User by ID", "List", and "Create" endpoints.
- **Encryption:** Passwords MUST be hashed (Bcrypt).
- **Session:** JWT (JSON Web Tokens) with Access/Refresh strategy.

---

## Success Criteria

| Metric | Target |
|--------|--------|
| **Security** | Public registration endpoint returns 404 or 403 |
| **Performance** | Login response < 100ms |
| **Isolation** | Non-admins accessing `POST /users` returns 403 Forbidden |
| **Integrity** | 100% of new Users have a default "Inbox" Collection |

---

## Constraints

**From PROJECT_BRIEF.md:**
- **Framework:** NestJS (Clean Architecture).
- **Database:** PostgreSQL.
- **Architecture:** Strict separation of Controller / Service / Repository.

---

## Related Documents

- [PROJECT_BRIEF.md](../../PROJECT_BRIEF.md)
- [DOMAIN_MODEL.md](../../DOMAIN_MODEL.md)

---

## Next Step

**Run:** `/architect-feature` to create detailed design.

---
**Version:** 1.1 (Refined: Admin-only Creation)
