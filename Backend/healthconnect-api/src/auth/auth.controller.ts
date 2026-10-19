import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { UserRole } from '../users/user.entity.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') pass: string,
    @Body('role') role?: UserRole,
  ) {
    return this.authService.register(email, pass, role);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') pass: string,
  ) {
    return this.authService.login(email, pass);
  }
}