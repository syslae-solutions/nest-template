import { PaginationService } from '@/common/pagination/pagination.service';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUser, UpdateUser } from '../entities/user.entity';
import { FindAllUsersParams, UserContract } from './user.contract';

@Injectable()
export class UserRepository implements UserContract {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagination: PaginationService,
  ) {}

  async create(user: CreateUser) {
    return this.prisma.user.create({
      data: user,
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll({ tenantId, page, perPage }: FindAllUsersParams) {
    const where = { tenantId };

    return this.pagination.paginate({
      page,
      perPage,
      query: {
        count: () => this.prisma.user.count({ where }),
        findMany: ({ skip, take }) =>
          this.prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take,
          }),
      },
    });
  }

  async update(tenantId: string, id: string, user: UpdateUser) {
    return this.prisma.user.update({
      where: {
        tenantId_id: {
          tenantId,
          id,
        },
      },
      data: user,
    });
  }

  async delete(tenantId: string, id: string) {
    await this.prisma.user.delete({
      where: {
        tenantId_id: {
          tenantId,
          id,
        },
      },
    });
  }
}
