import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN) // 👈 Sirf Admin hi yeh sab endpoints access kar sakta hai
export class AdminController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 1. Saare registered users ko dekhna (Students, Doctors, Patients, Organizations)
  @Get('users')
  async getAllUsers() {
    
     const users = await this.userRepository.find({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },// Password hidden rakha hai security ke liye
    });
    return {
      totalUsers: users.length,
      users,
    };
  }

  // 2. Kisi bhi user ko delete / block karna
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userRepository.delete(id);
    return {
      message: `User with ID ${id} has been deleted successfully by Admin.`,
    };
  }
}