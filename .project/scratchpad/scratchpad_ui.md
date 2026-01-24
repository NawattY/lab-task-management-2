# UI Patterns Scratchpad

## Current Understanding (from SYSTEM_OVERVIEW.md)
- **Framework:** Next.js 16.x (App Router)
- **UI Library:** Tailwind CSS 4.x, Shadcn/ui 3.x
- **State Management:** Zustand 5.x
- **Data Fetching:** TanStack Query 5.x
- **Language:** TypeScript
- **Structure:** Monorepo (apps/frontend)

## Items to Define
1. **Project Structure**
   - Confirm strict App Router structure.
   - Where do `components` live? (atomic? features?)
   - Where do `hooks` live?
2. **Layouts**
   - RootLayout
   - (auth) layout
   - (dashboard) layout
3. **API Integration**
   - Axios instance configuration (interceptors for auth).
   - React Query query key factory pattern.
   - Zod integration for response validation?
4. **State Management**
   - Global stores (Auth, Theme).
   - Server state handled by React Query.
5. **Styling**
   - Tailwind config (v4).
   - Shadcn theming (css variables).
   - Dark mode approach (next-themes).
6. **Route Guards**
   - Middleware (Next.js middleware.ts).
