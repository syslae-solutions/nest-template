import { Injectable } from '@nestjs/common';
import { PaginatedResult, PaginateOptions } from './pagination.types';

@Injectable()
export class PaginationService {
  async paginate<T>({
    page,
    perPage,
    query,
  }: PaginateOptions<T>): Promise<PaginatedResult<T>> {
    const skip = (page - 1) * perPage;
    const [total, data] = await Promise.all([
      query.count(),
      query.findMany({ skip, take: perPage }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        lastPage: Math.max(Math.ceil(total / perPage), 1),
        perPage,
      },
    };
  }
}
