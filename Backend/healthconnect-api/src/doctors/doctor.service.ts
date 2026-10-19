import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity.js';
import { DoctorSchedule } from './doctor-schedule.entity.js';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DoctorSchedule)
    private readonly scheduleRepository: Repository<DoctorSchedule>,
  ) {}

  // 1. Doctor apna availability schedule set / update karega
  async setSchedule(doctorId: string, scheduleData: { dayOfWeek: string; startTime: string; endTime: string }) {
    const doctor = await this.userRepository.findOne({ where: { id: doctorId, role: UserRole.DOCTOR } });
    if (!doctor) {
      throw new NotFoundException('Doctor profile not found.');
    }

    const schedule = this.scheduleRepository.create({
      ...scheduleData,
      doctor: { id: doctorId },
    });

    return await this.scheduleRepository.save(schedule);
  }

  // Doctor ka schedule view karna
  async getDoctorSchedule(doctorId: string) {
    return await this.scheduleRepository.find({
      where: { doctor: { id: doctorId }, isAvailable: true },
    });
  }

  // 2. Public / Patients List (Sirf VERIFIED doctors show honge frontend par - QueryBuilder fix)
  async getVerifiedDoctors() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.specialization',
        'user.consultationFee',
        'user.isTopDoctor',
      ])
      .where('user.role = :role', { role: UserRole.DOCTOR })
      .andWhere('user.isVerified = :isVerified', { isVerified: true })
      .getMany();
  }

  // 3. Home Page Ke Liye Top Doctors (Sirf Verified + Top Doctors - QueryBuilder fix)
  async getTopDoctors() {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.specialization',
        'user.consultationFee',
        'user.isTopDoctor',
      ])
      .where('user.role = :role', { role: UserRole.DOCTOR })
      .andWhere('user.isVerified = :isVerified', { isVerified: true })
      .andWhere('user.isTopDoctor = :isTopDoctor', { isTopDoctor: true })
      .getMany();
  }

  // 4. Admin Doctor Ko Verify Karega (Verification Gating)
  async verifyDoctor(doctorId: string) {
    const doctor = await this.userRepository.findOne({ where: { id: doctorId, role: UserRole.DOCTOR } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found.');
    }

    doctor.isVerified = true;
    return await this.userRepository.save(doctor);
  }

  // 5. Admin Doctor ko Top Doctor Mark Karega (Home Page Display Ke Liye)
  async toggleTopDoctor(doctorId: string, isTop: boolean) {
    const doctor = await this.userRepository.findOne({ where: { id: doctorId, role: UserRole.DOCTOR } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found.');
    }

    doctor.isTopDoctor = isTop;
    return await this.userRepository.save(doctor);
  }
}