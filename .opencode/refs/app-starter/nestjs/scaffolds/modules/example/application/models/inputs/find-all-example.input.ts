import { PaginateInput } from '@app/shared/models/paginate.input';

export class FindAllExampleInput extends PaginateInput {
  search?: string;
}
