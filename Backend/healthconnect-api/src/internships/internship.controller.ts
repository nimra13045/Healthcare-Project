import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { InternshipService } from './internship.service.js';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { UserRole } from '../users/user.entity.js';

@Controller('internships')
export class InternshipController {
  constructor(private readonly internshipService: InternshipService) {}

  // Public: Sabhi internships frontend par show hongi
  @Get()
  async getInternships() {
    return await this.internshipService.getAllInternships();
  }

  // Organization Only: New Internship Post karna
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ORGANIZATION)
  async create(@Req() req: any, @Body() body: any) {
    const userId = req.user.userId; // JWT se organization ki ID mil jayegi
    return await this.internshipService.createInternship(userId, body);
  }

  // Student Only: Internship par apply karna (Login zaroori hai)
  @Post(':id/apply')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.STUDENT)
  async apply(@Req() req: any, @Param('id') internshipId: string) {
    const studentId = req.user.userId; // JWT se student ki ID mil jayegi
    return await this.internshipService.applyForInternship(studentId, internshipId);
  }

  // Organization Only: Apni internship ke applicants dekhna
  @Get(':id/applicants')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ORGANIZATION)
  async getApplicants(@Param('id') internshipId: string) {
    return await this.internshipService.getApplicants(internshipId);
  }

  // Organization Only: Application status update karna (Accepted / Rejected)
  @Patch('applications/:id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ORGANIZATION)
  async updateStatus(
    @Req() req: any,
    @Param('id') applicationId: string,
    @Body('status') status: string, // 'Accepted' ya 'Rejected'
  ) {
    const organizationId = req.user.userId;
    return await this.internshipService.updateApplicationStatus(applicationId, status, organizationId);
  }
}