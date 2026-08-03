import { ConflictException } from '@/common/domain/http.errors';
import { HashGenerator } from '@/modules/cryptography/repositories/hash.generator.contract';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { withoutUserPassword } from '../entities/user.entity';
import { UserContract } from '../repositories/user.contract';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly users: UserContract,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(tenantId: string, body: CreateUserDto) {
    const emailExists = await this.users.findByEmail(body.email);

    if (emailExists) {
      throw new ConflictException('Já existe um usuário com esse email.');
    }

    const password = await this.hashGenerator.hash(body.password);

    const user = await this.users.create({ ...body, tenantId, password });

    return withoutUserPassword(user);
  }
}
