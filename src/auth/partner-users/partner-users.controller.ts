import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserPresenter } from '../users/class-transform/user.presenter';

@Controller('partners/users')
export class PartnerUsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.createPartnerUser(data);
    return new UserPresenter(user);
  }
}
