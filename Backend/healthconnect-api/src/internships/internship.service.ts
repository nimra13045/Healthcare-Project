import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Internship } from './internship.entity.js';
import { Application } from './application.entity.js';
import { User, UserRole } from '../users/user.entity.js';

@Injectable()
export class InternshipService {
  constructor(
    @InjectRepository(Internship)
    private readonly internshipRepository: Repository<Internship>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  // 1. Organization internship post karegi
  async createInternship(userId: string, data: { title: string; description: string; companyName: string; location: string }) {
    const internship = this.internshipRepository.create({
      ...data,
      organization: { id: userId },
    });
    return await this.internshipRepository.save(internship);
  }

  // 2. Sabhi internships dekhna (Frontend / Students ke liye - Public ya Protected)
  async getAllInternships() {
    return await this.internshipRepository
      .createQueryBuilder('internship')
      .leftJoin('internship.organization', 'organization')
      .addSelect(['organization.id', 'organization.email'])
      .getMany();
  }

  // 3. Student ka kisi internship par apply karna
  async applyForInternship(studentId: string, internshipId: string) {
    const internship = await this.internshipRepository.findOne({ where: { id: internshipId } });
    if (!internship) {
      throw new NotFoundException('Internship not found.');
    }

    // Check if already applied
    const existingApp = await this.applicationRepository.findOne({
      where: { student: { id: studentId }, internship: { id: internshipId } },
    });
    if (existingApp) {
      throw new ForbiddenException('You have already applied for this internship.');
    }

    const application = this.applicationRepository.create({
      student: { id: studentId },
      internship: { id: internshipId },
    });

    await this.applicationRepository.save(application);
    return { message: 'Successfully applied for the internship!' };
  }

  // 4. Organization apni post ki gayi internships par applications dekh sake
  async getApplicants(internshipId: string) {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.student', 'student')
      .select([
        'application.id',
        'application.status',
        'application.appliedAt',
        'student.id',
        'student.email',
        'student.role',
      ])
      .where('application.internshipId = :internshipId', { internshipId })
      .getMany();
  }

 // 5. Organization application ka status update karegi (Accepted / Rejected)
  async updateApplicationStatus(applicationId: string, status: string, organizationId: string) {
    // QueryBuilder use karke application, internship aur organization aik sath join karein
    const application = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.internship', 'internship')
      .leftJoinAndSelect('internship.organization', 'organization')
      .where('application.id = :applicationId', { applicationId })
      .getOne();

    if (!application) {
      throw new NotFoundException('Application not found.');
    }

    // Security check: Verify that the organization owns this internship
    if (application.internship.organization.id !== organizationId) {
      throw new ForbiddenException('You are not authorized to update this application status.');
    }

    application.status = status;
    return await this.applicationRepository.save(application);
  }
}