# Nuxt.js Coding Standards & Style Guide

> **PURPOSE:** Ensure code readability, maintainability, and consistency.  
> **STACK:** Nuxt 3.x + Vue 3.x + TypeScript + Composition API

---

## 1) Component Structure

### Script Setup (Required)
```vue
<!-- ✅ CORRECT: Use script setup with TypeScript -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  collection: Collection
}>()

const emit = defineEmits<{
  edit: [id: string]
}>()

const isOpen = ref(false)
</script>

<template>
  <div>...</div>
</template>
```

### Component Organization
```vue
<!-- ✅ CORRECT order: -->
<!-- 1. script setup (imports, props, emits, logic) -->
<!-- 2. template -->
<!-- 3. style (scoped) -->

<script setup lang="ts">
// 1. Imports
import { ref, computed, watch } from 'vue'
import type { Collection } from '~/types/entities'

// 2. Props
const props = defineProps<{
  collection: Collection
}>()

// 3. Emits
const emit = defineEmits<{
  update: [collection: Collection]
}>()

// 4. Composables
const toast = useToast()

// 5. State
const isEditing = ref(false)

// 6. Computed
const displayName = computed(() => props.collection.title)

// 7. Methods
function handleSubmit() {
  // ...
}

// 8. Watchers
watch(() => props.collection, (newVal) => {
  // ...
})
</script>

<template>
  <!-- template -->
</template>

<style scoped>
/* styles */
</style>
```

---

## 2) Props & Emits

### TypeScript Props
```vue
<script setup lang="ts">
// ✅ CORRECT: Interface with TypeScript generics
interface Props {
  collection: Collection
  editable?: boolean
  maxItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  editable: false,
  maxItems: 10,
})

// ❌ AVOID: Object syntax
const props = defineProps({
  collection: Object,
  editable: Boolean,
})
</script>
```

### TypeScript Emits
```vue
<script setup lang="ts">
// ✅ CORRECT: Typed emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [data: FormData]
  'cancel': []
}>()

// Usage
emit('update:modelValue', 'new value')
emit('submit', formData)
</script>
```

---

## 3) Composables Pattern

### Composable Structure
```typescript
// composables/useCollection.ts
export function useCollection(id: MaybeRef<string>) {
  const collectionId = toRef(id)
  
  const { data, pending, error, refresh } = useApi<Collection>(
    () => `/collections/${collectionId.value}`,
    { watch: [collectionId] }
  )

  const isLoading = computed(() => pending.value)
  
  async function update(data: UpdateCollectionInput) {
    await $fetch(`/api/v1/collections/${collectionId.value}`, {
      method: 'PUT',
      body: data,
    })
    await refresh()
  }

  return {
    collection: data,
    isLoading,
    error,
    refresh,
    update,
  }
}
```

### Composable Naming
```typescript
// ✅ CORRECT
useAuth()           // Auth logic
useCollection(id)   // Single collection
useCollections()    // Collection list
usePagination()     // Pagination logic

// ❌ WRONG
getAuth()           // Not a composable name
fetchCollection()   // Not a composable name
```

---

## 4) Template Best Practices

### v-if vs v-show
```vue
<template>
  <!-- ✅ v-if: For conditional rendering (removes from DOM) -->
  <div v-if="isAuthenticated">
    <UserProfile />
  </div>

  <!-- ✅ v-show: For frequent toggle (CSS display) -->
  <div v-show="isDropdownOpen">
    <DropdownMenu />
  </div>
</template>
```

### Loading/Error/Data Pattern
```vue
<template>
  <!-- ✅ CORRECT: Handle all states -->
  <div v-if="pending" class="loading">
    <AppSkeleton />
  </div>
  
  <div v-else-if="error" class="error">
    <AppError :error="error" @retry="refresh" />
  </div>
  
  <div v-else-if="!data?.length" class="empty">
    <AppEmpty message="No collections found" />
  </div>
  
  <div v-else class="content">
    <CollectionCard v-for="item in data" :key="item.id" :collection="item" />
  </div>
</template>
```

### Event Handling
```vue
<template>
  <!-- ✅ CORRECT: Method reference -->
  <button @click="handleClick">Click</button>
  
  <!-- ✅ CORRECT: Inline with $event -->
  <input @input="value = ($event.target as HTMLInputElement).value" />
  
  <!-- ✅ CORRECT: Modifiers -->
  <form @submit.prevent="handleSubmit">
  <input @keyup.enter="search">
</template>
```

---

## 5) Styling

### Scoped Styles
```vue
<style scoped>
/* ✅ CORRECT: Scoped styles */
.card {
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
```

### Vuetify Classes
```vue
<template>
  <!-- ✅ CORRECT: Use Vuetify utility classes -->
  <v-card class="pa-4 ma-2 rounded-lg">
    <v-card-title class="text-h6">Title</v-card-title>
  </v-card>
</template>
```

### Tailwind (If Used)
```vue
<template>
  <!-- ✅ CORRECT: Tailwind utilities -->
  <div class="flex items-center gap-4 p-4 rounded-lg bg-white shadow">
    <span class="text-lg font-semibold">Title</span>
  </div>
</template>
```

---

## 6) Form Handling

### VeeValidate + Zod
```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['book', 'comic', 'movie']),
})

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(schema),
})

const [title, titleProps] = defineField('title')
const [type, typeProps] = defineField('type')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <v-text-field v-model="title" v-bind="titleProps" :error-messages="errors.title" />
    <v-select v-model="type" v-bind="typeProps" :items="['book', 'comic', 'movie']" />
    <v-btn type="submit">Submit</v-btn>
  </form>
</template>
```

### Simple Form (No Library)
```vue
<script setup lang="ts">
const form = reactive({
  title: '',
  type: 'book',
})

const errors = ref<Record<string, string>>({})

function validate() {
  errors.value = {}
  if (!form.title) errors.value.title = 'Title is required'
  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  // Submit logic
}
</script>
```

---

## 7) Import Ordering

```vue
<script setup lang="ts">
// ✅ CORRECT order (separated by blank lines):

// 1. Vue/Nuxt
import { ref, computed, watch } from 'vue'

// 2. Third-party
import { useForm } from 'vee-validate'
import { format } from 'date-fns'

// 3. Composables
import { useCollection } from '~/composables/useCollection'
import { useAuth } from '~/composables/useAuth'

// 4. Components
import CollectionCard from '~/components/features/collection/CollectionCard.vue'

// 5. Types
import type { Collection } from '~/types/entities'
</script>
```

---

## 8) TypeScript Strict Mode

### Nullable Handling
```vue
<script setup lang="ts">
// ✅ CORRECT: Check before use
const { data: collection } = await useApi<Collection>('/collections/1')

if (!collection.value) {
  throw createError({ statusCode: 404, message: 'Not found' })
}

// ✅ CORRECT: Optional chaining
const title = collection.value?.metadata?.title ?? 'Untitled'

// ❌ AVOID: Type assertion
const title = (collection as Collection).title
</script>
```

### Explicit Typing
```vue
<script setup lang="ts">
// ✅ CORRECT: Explicit ref type
const items = ref<Collection[]>([])
const selectedId = ref<string | null>(null)

// ❌ AVOID: Implicit any
const items = ref([])
</script>
```

---

## 9) Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CollectionCard.vue` |
| Pages | kebab-case | `collection-list.vue` |
| Composables | camelCase + use | `useAuth.ts` |
| Stores | camelCase | `user.ts` |
| Variables | camelCase | `collectionData` |
| Constants | UPPER_SNAKE | `MAX_ITEMS` |
| Types/Interfaces | PascalCase | `CollectionProps` |
| Booleans | is/has/can | `isLoading`, `hasError` |

---

## 10) Comments & Documentation

### Component Documentation
```vue
<script setup lang="ts">
/**
 * CollectionCard - Displays a collection with cover and metadata
 * 
 * @example
 * <CollectionCard :collection="collection" @edit="handleEdit" />
 */

// Props
interface Props {
  /** The collection to display */
  collection: Collection
  /** Whether the card is editable */
  editable?: boolean
}
</script>
```

### Complex Logic
```vue
<script setup lang="ts">
// ✅ CORRECT: Explain WHY
// Filter archived items unless user is admin
// Business rule: Regular users should not see archived content
const visibleItems = computed(() => 
  items.value.filter(item => !item.isArchived || user.value?.role === 'admin')
)

// ❌ AVOID: Obvious comments
// Get user from store
const user = useUserStore().user
</script>
```

---

## 11) Testing Standards

### Component Test (Vitest)
```typescript
// tests/components/CollectionCard.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CollectionCard from '~/components/features/collection/CollectionCard.vue'

describe('CollectionCard', () => {
  const mockCollection = { id: '1', title: 'Test Collection', type: 'book' }

  it('renders collection title', () => {
    const wrapper = mount(CollectionCard, {
      props: { collection: mockCollection },
    })
    expect(wrapper.text()).toContain('Test Collection')
  })

  it('emits edit event when clicked', async () => {
    const wrapper = mount(CollectionCard, {
      props: { collection: mockCollection, editable: true },
    })
    
    await wrapper.find('[data-test="edit-btn"]').trigger('click')
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')![0]).toEqual(['1'])
  })
})
```

### Composable Test
```typescript
// tests/composables/useAuth.test.ts
import { describe, it, expect, vi } from 'vitest'
import { useAuth } from '~/composables/useAuth'

describe('useAuth', () => {
  it('returns isAuthenticated as false initially', () => {
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
  })
})
```

---

## 12) Performance Best Practices

### Avoid Unnecessary Reactivity
```vue
<script setup lang="ts">
// ✅ CORRECT: Use shallowRef for large objects
const largeList = shallowRef<Item[]>([])

// ✅ CORRECT: Memoize expensive computations
const sortedItems = computed(() => 
  [...items.value].sort((a, b) => a.title.localeCompare(b.title))
)

// ❌ AVOID: Reactive for static data
const config = reactive({ apiUrl: 'http://...' }) // Use const instead
</script>
```

### Lazy Loading Components
```vue
<script setup lang="ts">
// ✅ CORRECT: Lazy load heavy components
const HeavyChart = defineAsyncComponent(() => 
  import('~/components/HeavyChart.vue')
)
</script>

<template>
  <Suspense>
    <HeavyChart />
    <template #fallback>
      <AppSkeleton />
    </template>
  </Suspense>
</template>
```

### Image Optimization
```vue
<template>
  <!-- ✅ CORRECT: Use NuxtImg -->
  <NuxtImg src="/image.jpg" width="300" height="200" loading="lazy" />
  
  <!-- ❌ AVOID: Regular img for static assets -->
  <img src="/image.jpg" />
</template>
```

---

*End of Coding Standards*
