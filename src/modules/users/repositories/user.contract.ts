import {
  PaginatedResult,
  PaginationParams,
} from '@/common/pagination/pagination.types';
import { CreateUser, UpdateUser, User } from '../entities/user.entity';

export interface FindAllUsersParams extends PaginationParams {
  tenantId: string;
}

export abstract class UserContract {
  abstract create(user: CreateUser): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(params: FindAllUsersParams): Promise<PaginatedResult<User>>;
  abstract update(
    tenantId: string,
    id: string,
    user: UpdateUser,
  ): Promise<User>;
  abstract delete(tenantId: string, id: string): Promise<void>;
}
