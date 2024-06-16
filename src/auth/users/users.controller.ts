import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserPresenter } from './class-transform/user.presenter';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.createCommonUser(data);
    return new UserPresenter(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserPresenter(user));
  }
}
