// src/modules/example/exceptions/example.exception.ts

import { HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@app/constants/error-code.constant';
import { AppException } from '@app/shared/exceptions/app.exception';

/**
 * ExampleException — Module-specific exception factory
 *
 * @rule Use `: never` return type (function throws, never returns)
 * @rule Use `throw` directly, NOT `return new Exception()`
 * @rule Use `AppException` for consistent error format
 *
 * Usage:
 *   ExampleException.notFound(); // throws, never returns
 */
export class ExampleException {
  static notFound(): never {
    throw new AppException({
      errorCode: ERROR_CODE.EXAMPLE_NOT_FOUND,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  static alreadyExists(): never {
    throw new AppException({
      errorCode: ERROR_CODE.EXAMPLE_ALREADY_EXISTS,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
