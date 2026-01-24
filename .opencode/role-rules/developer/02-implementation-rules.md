# IMPLEMENTATION RULES

## 1. Conflict Protocol (CRITICAL)
Before writing code, check:
- Does `STORY_SPEC.md` violate `SYSTEM_PRINCIPLES.md`? (e.g., Logic in Controller?)
- Does it reference non-existent paths?
**IF YES -> STOP IMMEDIATELY and report the conflict.**

## 2. Pattern Matching (Mimicry)
You SHOULD analyze existing modules defined in `SYSTEM_OVERVIEW.md` to strictly mimic:
- **Backend:** Interface-based DI (`@Inject`), `transformEntity` pattern.
- **Frontend:** Nuxt 3 Composition API, `$api` wrapper, Vuetify components.
- **Style:** Naming conventions (Snake/Camel/Pascal).

## 3. Workflow Order
1. **Types First:** Define DTOs (BE) / Interfaces (FE) from `STORY_SPEC.md` **BEFORE** writing logic.
2. **Skeleton:** Create empty classes/files as defined in STORY_SPEC.md.
3. **Logic:** Implement step-by-step following STORY_SPEC.md sections.

## 4. Strict Scope
- Modify **ONLY** files specified in `STORY_SPEC.md`.

---

## 5. Scaffold & Reference Files (CRITICAL)

**Where to find scaffolds:**
- **Project-specific:** Check `STORY_SPEC.md` for exact file paths
- **Template library:** `.opencode/refs/` (if exists)
- **Existing codebase:** Use `/research --quick` to find similar code

When STORY_SPEC references scaffold, template, or reference files:

### Rule: **COPY FIRST, ADAPT SECOND**

1. **Copy the scaffold file EXACTLY** to the target location
2. **Only adapt these things:**
   - Import paths to match project structure
   - Names to match domain (e.g., `User` → `TrackableItem`)
3. **NEVER remove:**
   - Validation patterns (`class-validator` decorators)
   - Utility functions (`validateAndTransformConfig`, etc.)
   - Error handling patterns
   - Type definitions

### ❌ PROHIBITED:
- Rewriting scaffold files "from scratch"
- Removing validation "to simplify"
- Skipping utility imports
- Changing architectural patterns (e.g., validation class → direct `process.env`)

### ✅ CORRECT APPROACH:
```
1. Copy scaffold EXACTLY to target path
2. Change ONLY: import paths, entity/domain names
3. KEEP: validation class, utility functions, error handling, types
```

---

## 6. Technology-Specific Patterns

For technology-specific examples of correct vs incorrect patterns:
- **Backend patterns:** See `SYSTEM_PRINCIPLES.md` → "Scaffold Examples" section
- **Frontend patterns:** See `UI_PATTERNS.md` → "Scaffold Examples" section
- **Scaffold files:** Specified in `STORY_SPEC.md` or feature's scaffold references

> **Rule:** If `.project/` contains scaffold examples, follow them EXACTLY.
> If no examples exist, ask the user or follow existing codebase patterns.

---

## 7. Import Path Convention (CRITICAL)

### Standard Prefixes

| Prefix | Meaning | Example |
|--------|---------|---------|
| `@xxx/` | External NPM packages | `@nestjs/common`, `@prisma/client` |
| `@repo/` | Monorepo internal packages | `@repo/database`, `@repo/shared` |
| `@app/` | App internal paths (tsconfig) | `@app/core/config`, `@app/modules/user` |

### Rules

1. **NEVER mix relative and alias imports** for internal files
2. **ALWAYS use `@app/*`** for app internal imports (not `./` or `../`)
3. **ALWAYS use `@repo/*`** for monorepo packages (not relative paths)
4. **Check `tsconfig.json` paths** before modifying import statements

### ❌ PROHIBITED

```typescript
// Don't use relative paths for internal imports
import { config } from '../../../core/config';
import { UserService } from '../../modules/user/user.service';
```

### ✅ CORRECT

```typescript
// Use path aliases
import { config } from '@app/core/config';
import { UserService } from '@app/modules/user/user.service';
import { prisma } from '@repo/database';
```

### When Fixing Import Errors

- **Check `tsconfig.json` paths** first
- **Preserve the alias pattern** (`@app/*`, `@repo/*`)
- **NEVER convert aliases to relative paths**