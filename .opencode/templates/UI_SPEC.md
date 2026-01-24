# UI Spec: [Page/Component Name]

**Story:** [Parent Story]  
**Created:** [Date]

---

## Page Overview

**Route:** `/[path]/[subpath]`  
**Layout:** [LayoutName] (e.g., AdminLayout, PublicLayout)  
**Auth:** Required / Public

---

## User Flow

1. User navigates to [entry point]
2. User [action 1]
3. User [action 2]
4. System [response]
5. User redirected to [destination] with [feedback]

---

## UI Components

### Form Fields

| Field Label | Component | Validation | API Field | Notes |
|-------------|-----------|------------|-----------|-------|
| [Label TH] | VTextField | required, max(200) | fieldName | [notes] |
| [Label TH] | VNumberInput | required, min(0) | price | [format: currency] |
| [Label TH] | VAutocomplete | required | categoryId | [load from API] |
| [Label TH] | VSelect | optional | status | [options: [...]] |

### Actions

| Action | Trigger | API Call | Success | Error |
|--------|---------|----------|---------|-------|
| Save | Click button | POST /v1/... | Redirect to list | Show inline errors |
| Cancel | Click button | None | Navigate back | - |

---

## States

| State | Condition | UI Behavior |
|-------|-----------|-------------|
| Loading | API fetching | Show skeleton/spinner |
| Empty | No data | Show empty state message |
| Error | API failed | Show error alert |
| Success | Action complete | Show success snackbar |

---

## Implementation Tasks

- [ ] [P] Create composable for API calls
- [ ] [P] Create form component (if reusable)
- [ ] Create page file (depends on composable)
- [ ] Add route to router config
- [ ] Update UI_PATTERNS.md (if new pattern)

**[P] = Parallel task (no dependencies)**

---

## File Locations

| File | Path |
|------|------|
| Page | `pages/[section]/[name].vue` |
| Composable | `composables/use[Name].ts` |
| Component | `components/[Name]/[Component].vue` |

---

## Embedded Patterns (from UI_PATTERNS.md)

### Existing Components to Use
- VTextField: Text input with label
- VNumberInput: Numeric with formatting
- VAutocomplete: Async search dropdown
- VSelect: Static dropdown
- VDialog: Modal dialogs
- VDataTable: Data tables with pagination

### Form Patterns
```vue
<VForm @submit="onSubmit">
  <VTextField v-model="form.fieldName" :rules="rules.fieldName" />
  <VBtn type="submit" :loading="isLoading">Save</VBtn>
</VForm>
```

### API Composable Pattern
```typescript
const { data, loading, error, execute } = useApi<T>()
```

---

## API Integration

| Action | Method | Endpoint | Response |
|--------|--------|----------|----------|
| Load data | GET | /v1/[resource] | List/Single |
| Submit | POST | /v1/[resource] | Created item |
| Update | PATCH | /v1/[resource]/:id | Updated item |

---

## Checklist Before Handoff

- [ ] Route specified
- [ ] All form fields mapped to API
- [ ] All UI states handled (loading, empty, error)
- [ ] Existing components identified for reuse
- [ ] File paths are project-specific
- [ ] Patterns match existing UI_PATTERNS.md
