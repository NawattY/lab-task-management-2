// src/modules/example/api/swagger/example.response.ts

import { SwaggerHelpers } from '@app/shared/swagger/swagger.helpers';
import { ERROR_CODE } from '@app/constants/error-code.constant';

/**
 * Example data for Swagger documentation
 */
const exampleData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Example Title',
  description: 'Example description',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

/**
 * Swagger responses for Create Example endpoint
 */
export const createExampleResponse = [
  SwaggerHelpers.success(201, exampleData, 'Example created successfully'),
  SwaggerHelpers.validationError(),
  SwaggerHelpers.unauthorized(),
  SwaggerHelpers.conflict(ERROR_CODE.EXAMPLE_ALREADY_EXISTS, 'Example already exists'),
];

/**
 * Swagger responses for Get Example endpoint
 */
export const getExampleResponse = [
  SwaggerHelpers.success(200, exampleData),
  SwaggerHelpers.unauthorized(),
  SwaggerHelpers.notFound('Example'),
];

/**
 * Swagger responses for List Examples endpoint (paginated)
 */
export const listExamplesResponse = [
  SwaggerHelpers.paginated([exampleData], 'Examples retrieved successfully'),
  SwaggerHelpers.unauthorized(),
];

/**
 * Swagger responses for Update Example endpoint
 */
export const updateExampleResponse = [
  SwaggerHelpers.success(200, exampleData, 'Example updated successfully'),
  SwaggerHelpers.validationError(),
  SwaggerHelpers.unauthorized(),
  SwaggerHelpers.notFound('Example'),
];

/**
 * Swagger responses for Delete Example endpoint
 */
export const deleteExampleResponse = [
  SwaggerHelpers.success(204, null, 'Example deleted successfully'),
  SwaggerHelpers.unauthorized(),
  SwaggerHelpers.notFound('Example'),
];
