# UI Patterns — Task Management System

## 1. Tech Stack

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| **Framework** | Next.js | 16.x | App Router, Server Components |
| **Language** | TypeScript | 5.x | Strict Mode |
| **Styling** | Tailwind CSS | 4.x | Utility-first, v4 Engine |
| **Components** | Shadcn/ui | 3.x | Radix Primitives, Copy-paste |
| **State** | Zustand | 5.x | Global Client State (Auth, UI) |
| **Server State** | TanStack Query | 5.x | Data Fetching & Caching |
| **HTTP Client** | Axios | 1.x | Interceptors, Global Error Handling |
| **Forms** | React Hook Form | 7.x | + Zod Validation |

## 2. Project Structure

We follow a **Feature-Based Architecture** to ensure scalability and separation of concerns, mirroring the backend's modular structure.

```
apps/frontend/src/
├── app/                    # Next.js App Router (Routing only)
│   ├── (auth)/             # Auth Route Group
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/        # App Route Group
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   ├── api/                # Route Handlers (Proxy/Edge)
│   ├── globals.css         # Global Styles & Tailwind
│   └── layout.tsx          # Root Layout
│
├── features/               # Domain Modules (Colocated Logic)
│   ├── auth/
│   │   ├── components/     # Feature-specific UI
│   │   │   └── LoginForm.tsx
│   │   ├── api/            # React Query Hooks & API calls
│   │   │   ├── useLogin.ts
│   │   │   └── auth.keys.ts # Query Key Factory
│   │   └── types/          # Domain Types (if unique to FE)
│   └── tasks/
│
├── components/             # Shared / Generic Components
│   ├── ui/                 # Shadcn/ui Primitive Components (Button, Input)
│   ├── layout/             # Layout Components (Sidebar, Navbar)
│   └── shared/             # Generic Reusable (e.g., DataGrid, Loader)
│
├── lib/                    # Infrastructure & Config
│   ├── axios.ts            # Axios Instance
│   ├── query-client.ts     # Query Client Config
│   └── utils.ts            # cn() helper
│
├── hooks/                  # Global / Generic Hooks
│   └── use-media-query.ts
│
└── store/                  # Global Stores (Zustand)
    └── use-user-store.ts   # Session State
```

## 3. Layouts & Routing

### Layout Pattern
| Layout | Route Group | Description |
|--------|-------------|-------------|
| **Root** | `app/layout.tsx` | Providers (Query, Theme), Fonts |
| **Auth** | `app/(auth)/layout.tsx` | Centered card layout, no sidebar |
| **Dashboard** | `app/(dashboard)/layout.tsx` | Protected, Sidebar, Topbar, User Menu |

### Route Guards (Middleware)
We use Next.js Middleware (`middleware.ts`) for edge-based protection.
- **Public Routes:** `/login`, `/register`, `/` (landing)
- **Protected Routes:** `/dashboard/*`, `/settings/*`
- **Logic:** Redirect unauthenticated users to `/login`.

## 4. API Integration Strategy

### Axios Client (`lib/axios.ts`)
- **Base URL:** From `NEXT_PUBLIC_API_URL`
- **Interceptors:**
  - **Request:** Attach `Authorization: Bearer <token>` (if stored in cookie/memory).
  - **Response:** Handle 401 (Unauthorized) -> Trigger logout / Refresh Token flow.

### Query Key Factory (`features/*/api/*.keys.ts`)
Centralize query keys to prevent cache invalidation bugs.
```typescript
// features/tasks/api/tasks.keys.ts
export const tasksKeys = {
  all: ['tasks'] as const,
  lists: () => [...tasksKeys.all, 'list'] as const,
  list: (filters: string) => [...tasksKeys.lists(), { filters }] as const,
  details: () => [...tasksKeys.all, 'detail'] as const,
  detail: (id: string) => [...tasksKeys.details(), id] as const,
}
```

### Data Fetching Hook
```typescript
// features/tasks/api/use-tasks.ts
export const useTasks = (filters: TaskFilters) => {
  return useQuery({
    queryKey: tasksKeys.list(JSON.stringify(filters)),
    queryFn: async () => {
      const { data } = await apiClient.get<Task[]>('/tasks', { params: filters })
      return data
    }
  })
}
```

## 5. State Management

### Local State
- Use `useState` or `useReducer` for UI-only state (modals, form inputs).
- Use `useSearchParams` for URL-driven state (filters, pagination).

### Server State (React Query)
- **Primary source of truth** for all business data.
- **Cache Policy:** Stale-while-revalidate.

### Global Client State (Zustand)
Use sparingly for truly global, non-server data.
- User Session (User object, permissions)
- UI Settings (Sidebar collapse, Theme mode)

```typescript
// store/use-ui-store.ts
interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
}
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
```

## 6. Styling & Theming

### Tailwind v4
- **Configuration:** No `tailwind.config.js` (CSS-first config in v4).
- **Variables:** Defined in `globals.css` using CSS variables (`--primary`, `--foreground`).

### Shadcn/ui
- **Installation:** `npx shadcn@latest add [component]`
- **Customization:** Modify `components/ui/*.tsx` directly.
- **Colors:** HSL values in `globals.css`.

### Dark Mode
- **Provider:** `next-themes`
- **Class:** `.dark` class applied to `<html>`.

## 7. Component Patterns

### Atomic Props
Avoid passing big objects. Pass primitives or specific interfaces.
```typescript
// ✅ Good
<TaskCard id={task.id} title={task.title} status={task.status} />

// ❌ Avoid (unless it's a dedicated container)
<TaskCard task={task} />
```

### "Client Only" Components
Mark interactive components with `'use client'` at the top.
Server components are default in `app/`.

---
**Version:** 1.0
**Created:** Sat Jan 24 2026
