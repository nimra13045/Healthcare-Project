import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from '../users/user.entity.js';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Public: Home page ke liye top doctors
  @Get('top')
  async getTopDoctors() {
    return await this.doctorService.getTopDoctors();
  }

  // Public: Front-end listing ke liye verified doctors
  @Get()
  async getVerifiedDoctors() {
    return await this.doctorService.getVerifiedDoctors();
  }

  // Public/Student: Specific Doctor ka schedule dekhna
  @Get(':id/schedule')
  async getSchedule(@Param('id') doctorId: string) {
    return await this.doctorService.getDoctorSchedule(doctorId);
  }

  // Doctor Only: Apna schedule/slots create karna
  @Post('schedule')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.DOCTOR)
  async setSchedule(
    @Req() req: any,
    @Body() body: { dayOfWeek: string; startTime: string; endTime: string },
  ) {
    const doctorId = req.user.userId;
    return await this.doctorService.setSchedule(doctorId, body);
  }

  // Admin Only: Doctor ko verify karna (Verification Gating)
  @Patch(':id/verify')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async verifyDoctor(@Param('id') doctorId: string) {
    return await this.doctorService.verifyDoctor(doctorId);
  }

  // Admin Only: Doctor ko Top Doctor Toggle karna (Home Page ke liye)
  @Patch(':id/top')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async toggleTopDoctor(
    @Param('id') doctorId: string,
    @Body('isTopDoctor') isTopDoctor: boolean,
  ) {
    return await this.doctorService.toggleTopDoctor(doctorId, isTopDoctor);
  }
}