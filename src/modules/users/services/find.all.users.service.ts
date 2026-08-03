import { Injectable } from '@nestjs/common';
import { FindAllUsersDto } from '../dtos/find.all.users.dto';
import { withoutUserPassword } from '../entities/user.entity';
import { UserContract } from '../repositories/user.contract';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly users: UserContract) {}

  async execute(tenantId: string, filters: FindAllUsersDto) {
    const users = await this.users.findAll({
      tenantId,
      page: filters.page ?? 1,
      perPage: filters.perPage ?? 10,
    });

    return {
      ...users,
      data: users.data.map(withoutUserPassword),
    };
  }
}
