import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from '../users/user.entity.js';

@Controller('ai')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // 1. Doctor / Patient Appointment Slot Assistant
  // Patient & Doctor roles can access this
  @Post('appointment-chat')
  @Roles(UserRole.PATIENT, UserRole.DOCTOR)
  async handleAppointmentChat(
    @Body('userQuery') userQuery: string,
    @Body('availableSlots') availableSlots: string[],
  ) {
    const slots = availableSlots && availableSlots.length > 0 
      ? availableSlots 
      : ['10:00 AM', '02:00 PM', '05:00 PM'];
      
    return {
      reply: await this.aiService.getAppointmentResponse(userQuery, slots),
    };
  }

  // 2. Student CV Review & Internship Matcher
  // Only Student role can access this
  @Post('match-cv')
  @Roles(UserRole.STUDENT)
  async handleCvMatch(@Body('cvText') cvText: string) {
    return {
      analysis: await this.aiService.matchInternshipAndReviewCv(cvText),
    };
  }
}