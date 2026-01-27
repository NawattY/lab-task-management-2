/**
 * Centralized Route Definitions
 * Single Source of Truth for all API routes
 *
 * @rule NEVER hardcode path strings in Controllers
 * @rule Always import and use ROUTES constant
 */

const PREFIX = { V1: 'v1', V2: 'v2' } as const;

export const ROUTES = {
  // 🟢 VERSION 1
  V1: {
    EXAMPLE: {
      ROOT: `${PREFIX.V1}/examples`,
      BY_ID: ':id',
    },
    // Add more modules here...
    // USER: {
    //   ROOT: `${PREFIX.V1}/users`,
    //   BY_ID: ':id',
    //   ME: 'me',
    // },
  },

  // 🔵 VERSION 2 (Incremental Rollout)
  // V2: {
  //   EXAMPLE: {
  //     ROOT: `${PREFIX.V2}/examples`,
  //     BY_ID: ':id',
  //   },
  // },
} as const;

/**
 * Usage in Controller:
 *
 * import { ROUTES } from '@app/routes/app-routes.constant';
 *
 * @Controller(ROUTES.V1.EXAMPLE.ROOT)
 * export class ExampleController {
 *   @Get()
 *   findAll() {}
 *
 *   @Get(ROUTES.V1.EXAMPLE.BY_ID)
 *   findOne(@Param('id') id: string) {}
 * }
 */
