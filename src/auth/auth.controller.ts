import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
