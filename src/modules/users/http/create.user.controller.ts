import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CurrentUser } from '@/modules/auth/infrastructure/decorators/current.user.decorator';
import { UserPayload } from '@/modules/auth/infrastructure/jwt/jwt.strategy';
import { CreateUserDto } from '../dtos/create.user.dto';
import { CreateUserService } from '../services/create.user.service';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async create(@CurrentUser() user: UserPayload, @Body() body: CreateUserDto) {
    return this.createUser.execute(user.tenantId, body);
  }
}
