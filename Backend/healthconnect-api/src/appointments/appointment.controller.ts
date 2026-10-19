import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from '../users/user.entity.js';

@Controller('appointments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // Patient Only: Appointment Book Karna
  @Post()
  @Roles(UserRole.PATIENT, UserRole.STUDENT) // Student ya Patient dono book kar sakein
  async bookAppointment(
    @Req() req: any,
    @Body() body: { doctorId: string; appointmentDate: string; slotTime: string },
  ) {
    const patientId = req.user.userId;
    return await this.appointmentService.bookAppointment(
      patientId,
      body.doctorId,
      body.appointmentDate,
      body.slotTime,
    );
  }

  // Doctor Only: Apne tamam appointments dekhna
  @Get('doctor')
  @Roles(UserRole.DOCTOR)
  async getDoctorAppointments(@Req() req: any) {
    const doctorId = req.user.userId;
    return await this.appointmentService.getDoctorAppointments(doctorId);
  }

  // Patient / Student Only: Apne tamam appointments dekhna
  @Get('my-appointments')
  @Roles(UserRole.PATIENT, UserRole.STUDENT)
  async getPatientAppointments(@Req() req: any) {
    const patientId = req.user.userId;
    return await this.appointmentService.getPatientAppointments(patientId);
  }

  // Doctor Only: Video Call Link add karna (Is se Status "Confirmed" ho jayega)
  @Patch(':id/video-link')
  @Roles(UserRole.DOCTOR)
  async addVideoLink(
    @Req() req: any,
    @Param('id') appointmentId: string,
    @Body('videoCallUrl') videoCallUrl: string,
  ) {
    const doctorId = req.user.userId;
    return await this.appointmentService.addVideoCallLink(appointmentId, doctorId, videoCallUrl);
  }

  // Doctor & Patient: Status update karna (Completed / Cancelled)
  @Patch(':id/status')
  async updateStatus(
    @Req() req: any,
    @Param('id') appointmentId: string,
    @Body('status') status: string,
  ) {
    const userId = req.user.userId;
    return await this.appointmentService.updateStatus(appointmentId, userId, status);
  }
}