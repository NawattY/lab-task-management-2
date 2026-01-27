# NestJS Scaffolds

> **Purpose:** Ready-to-use code templates for AI agents to copy when generating NestJS modules.  
> **Note:** Lint errors are expected — this is a template, not an executable project.

---

## 📁 Structure

```
scaffolds/
├── main.ts                           # Application entry point
├── app.module.ts                     # Root module
│
├── routes/                           # 📍 Centralized Route Definitions
│   └── app-routes.constant.ts        # Single Source of Truth (ROUTES.V1.X.ROOT)
│
├── modules/                          # 🎯 Domain Modules
│   └── example/                      # Example 4-layer module
│       ├── api/                      # Presentation Layer
│       │   ├── controllers/          # Controllers
│       │   ├── dtos/                 # Request/Response DTOs
│       │   └── swagger/              # Swagger response files
│       ├── application/              # Application Layer
│       │   ├── example.service.ts    # Service
│       │   └── models/               # Input/Output models
│       ├── domain/                   # Domain Layer
│       │   └── entities/             # Entities
│       ├── infrastructure/           # Infrastructure Layer
│       │   └── datasources/          # Interface + Prisma impl
│       ├── exceptions/               # Module exceptions
│       └── example.module.ts         # NestJS module
│
├── core/                             # ⚙️ Core Infrastructure
│   ├── auth/                         # JWT Auth
│   ├── database/                     # PrismaService
│   ├── config/                       # CoreConfigService
│   └── exceptions/                   # HttpExceptionFilter
│
├── shared/                           # 🔧 Shared Utilities
│   ├── decorators/                   # @ApiResponses, @CurrentUser
│   ├── dtos/                         # PaginateQueryDto
│   ├── exceptions/                   # AppException
│   ├── models/                       # PaginateInput, PaginatedOutput
│   ├── swagger/                      # SwaggerHelpers
│   └── helpers/                      # prismaPaginate
│
├── constants/                        # 📋 Error Constants
│   ├── error-code.constant.ts
│   └── error-message.constant.ts
│
└── config/                           # ⚙️ Configuration Definitions
```

---

## 🎯 4-Layer Module Pattern

When creating a new module, copy `modules/example/` and rename:

1. **API Layer** (`api/`)
   - Controllers with `ROUTES.V1.MODULE.ROOT` pattern
   - DTOs with class-validator
   - Swagger response files (use `@ApiResponses()`)

2. **Application Layer** (`application/`)
   - Service with `@Inject(TOKEN)` for datasource
   - Input/Output models

3. **Domain Layer** (`domain/`)
   - Entities (rich domain objects)
   - Value Objects, Enums

4. **Infrastructure Layer** (`infrastructure/`)
   - Datasource interface with Symbol token
   - Prisma implementation with `TransactionHost` + `transformEntity()`

---

## 🔑 Key Patterns

### Route Registry (Centralized)
```typescript
import { ROUTES } from '@app/routes/app-routes.constant';

@Controller(ROUTES.V1.EXAMPLE.ROOT)
export class ExampleController {
  @Get()           // maps to ROOT
  @Get(ROUTES.V1.EXAMPLE.BY_ID)  // ':id'
}
```

### TransactionHost (Infrastructure)
```typescript
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

constructor(
  private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
) {}

// Usage: this.txHost.tx.example.findUnique(...)
```

### @ApiResponses (Swagger)
```typescript
import { ApiResponses } from '@app/shared/decorators/api-response.decorator';
import { createExampleResponse } from '../swagger';

@ApiResponses(createExampleResponse)  // Single decorator for all responses
@Post()
create() {}
```

### Interface-Based DI
```typescript
// Interface
export const EXAMPLE_DATASOURCE = Symbol('EXAMPLE_DATASOURCE');
export interface ExampleDatasource { ... }

// Service
@Inject(EXAMPLE_DATASOURCE)
private readonly datasource: ExampleDatasource

// Module
{ provide: EXAMPLE_DATASOURCE, useClass: ExamplePrismaDatasource }
```

### Exception Factory (`: never`)
```typescript
export class ExampleException {
  static notFound(): never {
    throw new AppException({
      errorCode: ERROR_CODE.EXAMPLE_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
```

### Cross-Module Service (forwardRef)
```typescript
// OrderModule imports ProductModule
@Module({
  imports: [forwardRef(() => ProductModule)], // Break circular
})

// OrderService imports ProductService
constructor(
  @Inject(ORDER_DATASOURCE) private datasource: OrderDatasource,
  private readonly productService: ProductService, // Cross-module
) {}

// Use @Transactional() for cross-module operations
@Transactional()
async create(input) {
  await this.productService.validateForOrder(input.items);
  const order = await this.datasource.create(input);
  await this.productService.deductStock(input.items);
  return order;
}
```

### Module-Specific Query Params
```typescript
// DTO extends shared PaginateQueryDto
export class ExampleQueryDto extends PaginateQueryDto {
  @IsOptional()
  @IsString()
  readonly search?: string;  // Module-specific
}

// Input extends shared PaginateInput
export class FindAllExampleInput extends PaginateInput {
  search?: string;
}

// Datasource handles optional params
where: input.search
  ? { title: { contains: input.search } }
  : undefined,
```

---

## 📋 When to Copy

| Pattern | Copy From |
|---------|-----------|
| New API module | `modules/example/` |
| Route definitions | `routes/app-routes.constant.ts` |
| Auth guard | `core/auth/` |
| SwaggerHelpers | `shared/swagger/swagger.helpers.ts` |
| @ApiResponses | `shared/decorators/api-response.decorator.ts` |
| AppException | `shared/exceptions/app.exception.ts` |
| Pagination | `shared/dtos/`, `shared/models/` |
| Error codes | `constants/error-code.constant.ts` |

---

*See architecture-rules.md for detailed rules.*
