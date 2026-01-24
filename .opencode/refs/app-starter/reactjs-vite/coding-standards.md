# React + Vite Coding Standards & Style Guide

> **PURPOSE:** Ensure code readability, maintainability, and consistency.  
> **STACK:** React 19.x + Vite 7.x + TypeScript + Tailwind CSS

---

## 1) Component Structure

### Function Declaration (Preferred)
```tsx
// ✅ CORRECT: Function declaration
export function CollectionCard({ collection }: CollectionCardProps) {
  return <Card>...</Card>
}

// ❌ AVOID: Arrow function for components
export const CollectionCard = ({ collection }: CollectionCardProps) => {
  return <Card>...</Card>
}
```

### Props Interface
```tsx
// ✅ CORRECT: Interface with Props suffix
interface CollectionCardProps {
  collection: Collection
  onEdit?: (id: string) => void
  className?: string
}

export function CollectionCard({ collection, onEdit, className }: CollectionCardProps) {
  // ...
}
```

### Component Organization
```tsx
// ✅ CORRECT order:
// 1. Imports
// 2. Types/Interfaces
// 3. Component
// 4. Sub-components (if small)

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Card>
      {/* ... */}
    </Card>
  )
}
```

---

## 2) Hooks Pattern

### Custom Hook Structure
```tsx
// ✅ CORRECT: Return object with descriptive names
export function useCollections(params?: CollectionsParams) {
  const query = useQuery({
    queryKey: ['collections', params],
    queryFn: () => apiClient.get('/collections', params),
  })

  return {
    collections: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}

// ❌ AVOID: Return array (hard to read)
export function useCollections() {
  const query = useQuery(...)
  return [query.data, query.isLoading, query.error]
}
```

### Hook Naming
```tsx
// ✅ CORRECT
useCollections()      // Fetch multiple
useCollection(id)     // Fetch single
useCreateCollection() // Mutation
useUpdateCollection() // Mutation
useDeleteCollection() // Mutation

// ❌ WRONG
getCollections()      // Not a hook name
fetchCollection()     // Not a hook name
```

---

## 3) Styling with Tailwind

### cn() Helper
```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
<Card className={cn(
  'p-4 rounded-lg',
  isActive && 'border-primary',
  className
)} />
```

### Conditional Classes
```tsx
// ✅ CORRECT: Use cn() helper
<Button className={cn(
  'px-4 py-2',
  variant === 'primary' && 'bg-primary text-white',
  variant === 'secondary' && 'bg-secondary',
  disabled && 'opacity-50 cursor-not-allowed'
)} />

// ❌ AVOID: Template literals for conditionals
<Button className={`px-4 py-2 ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
```

### Responsive Design
```tsx
// ✅ CORRECT: Mobile-first approach
<div className="
  grid gap-4
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
">
  {/* ... */}
</div>
```

---

## 4) Form Handling

### React Hook Form + Zod
```tsx
// lib/validations/collection.ts
import { z } from 'zod'

export const createCollectionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  type: z.enum(['book', 'comic', 'movie']),
  notes: z.string().optional(),
})

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>
```

### Form Component
```tsx
// components/features/collection/collection-form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCollectionSchema, type CreateCollectionInput } from '@/lib/validations/collection'

interface CollectionFormProps {
  onSubmit: (data: CreateCollectionInput) => void
  defaultValues?: Partial<CreateCollectionInput>
}

export function CollectionForm({ onSubmit, defaultValues }: CollectionFormProps) {
  const form = useForm<CreateCollectionInput>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      title: '',
      type: 'book',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

---

## 5) Error Handling

### React Query Error
```tsx
// ✅ CORRECT: Handle in component
export function CollectionList() {
  const { data, isLoading, error } = useCollections()

  if (isLoading) return <CollectionListSkeleton />
  if (error) return <ErrorMessage error={error} />
  if (!data?.length) return <EmptyState />

  return (
    <div className="grid gap-4">
      {data.map(item => <CollectionCard key={item.id} collection={item} />)}
    </div>
  )
}
```

### Error Message Component
```tsx
// components/error-message.tsx
interface ErrorMessageProps {
  error: Error
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center p-8">
      <p className="text-destructive">{error.message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  )
}
```

---

## 6) Loading States

### Skeleton Components
```tsx
// components/features/collection/collection-card-skeleton.tsx
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CollectionCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-32 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  )
}

export function CollectionListSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CollectionCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

## 7) Import Ordering

```tsx
// ✅ CORRECT order (separated by blank lines):
// 1. React
// 2. Third-party libraries
// 3. Internal aliases (@/)
// 4. Relative imports (./)
// 5. Types/Interfaces

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { useCollections } from '@/hooks/queries/use-collections'

import { CollectionCard } from './collection-card'

import type { Collection } from '@/types/entities'
```

---

## 8) TypeScript Strict Mode

### Nullable Handling
```tsx
// ✅ CORRECT: Guard clause
const collection = useCollection(id)
if (!collection.data) return <NotFound />

// ✅ CORRECT: Optional chaining
const title = collection?.metadata?.title ?? 'Untitled'

// ❌ AVOID: Type assertion
const collection = data as Collection
```

### Explicit Return Types
```tsx
// ✅ CORRECT: Explicit return type for hooks
export function useCollections(): {
  collections: Collection[] | undefined
  isLoading: boolean
  error: Error | null
} {
  // ...
}
```

---

## 9) Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CollectionCard` |
| Hooks | camelCase + use | `useCollections` |
| Files (components) | kebab-case | `collection-card.tsx` |
| Files (hooks) | use-{name} | `use-collections.ts` |
| Files (stores) | {name}-store | `auth-store.ts` |
| Variables | camelCase | `collectionData` |
| Constants | UPPER_SNAKE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `CollectionCardProps` |
| Booleans | is/has/can | `isLoading`, `hasError` |

---

## 10) Comments & Documentation

### Component Documentation
```tsx
/**
 * Displays a collection card with cover image and metadata.
 * 
 * @example
 * <CollectionCard collection={collection} onEdit={handleEdit} />
 */
export function CollectionCard({ collection, onEdit }: CollectionCardProps) {
  // ...
}
```

### Complex Logic
```tsx
// ✅ CORRECT: Explain WHY, not WHAT
// Filter out archived items unless user has admin role
// See: JIRA-1234 for business requirements
const visibleItems = items.filter(item => 
  !item.isArchived || user.role === 'admin'
)

// ❌ AVOID: Obvious comments
// Get items from data
const items = data.items
```

---

## 11) Testing Standards

### Component Test (Vitest)
```tsx
// __tests__/components/collection-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CollectionCard } from '@/components/features/collection/collection-card'
import { vi } from 'vitest'

describe('CollectionCard', () => {
  const mockCollection = { id: '1', title: 'Test', type: 'book' }

  it('renders collection title', () => {
    render(<CollectionCard collection={mockCollection} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', () => {
    const onEdit = vi.fn()
    render(<CollectionCard collection={mockCollection} onEdit={onEdit} />)
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith('1')
  })
})
```

### Hook Test
```tsx
// __tests__/hooks/use-collections.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useCollections } from '@/hooks/queries/use-collections'
import { renderWithProviders } from '@/test/test-utils'

describe('useCollections', () => {
  it('returns collections data', async () => {
    const { result } = renderHook(() => useCollections(), {
      wrapper: ({ children }) => renderWithProviders(children),
    })

    await waitFor(() => {
      expect(result.current.collections).toHaveLength(2)
    })
  })
})
```

---

## 12) Performance Best Practices

### Avoid Unnecessary Re-renders
```tsx
// ✅ CORRECT: Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.title.localeCompare(b.title)),
  [items]
)

// ✅ CORRECT: Memoize callbacks passed to children
const handleClick = useCallback((id: string) => {
  // ...
}, [dependency])
```

### React.memo for Pure Components
```tsx
// ✅ CORRECT: Memoize expensive components
export const CollectionCard = memo(function CollectionCard({ 
  collection 
}: CollectionCardProps) {
  return <Card>...</Card>
})
```

### Lazy Loading
```tsx
// ✅ CORRECT: Lazy load heavy components
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('@/components/chart'))

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton className="h-64" />}>
      <HeavyChart />
    </Suspense>
  )
}
```

---

*End of Coding Standards*
