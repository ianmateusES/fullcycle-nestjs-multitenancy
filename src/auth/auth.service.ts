import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Email/password is incorrect');
    }

    if (
      !this.usersService.comparePassword({
        hash_password: user.password,
        password: data.password,
      })
    ) {
      throw new NotFoundException('Email/password is incorrect');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = user;

    const token = this.jwtService.sign(payload);

    return { user: payload, token };
  }
}
