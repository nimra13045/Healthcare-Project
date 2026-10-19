import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity.js';
import { User, UserRole } from '../users/user.entity.js';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 1. Patient Appointment Book karega (Sirf Verified Doctor ke sath)
  async bookAppointment(
    patientId: string,
    doctorId: string,
    appointmentDate: string,
    slotTime: string,
  ) {
    // Check karein ke doctor exist karta hai aur VERIFIED hai
    const doctor = await this.userRepository.findOne({
      where: { id: doctorId, role: UserRole.DOCTOR },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found.');
    }

    if (!doctor.isVerified) {
      throw new BadRequestException('Cannot book appointment with an unverified doctor.');
    }

    const appointment = this.appointmentRepository.create({
      patient: { id: patientId },
      doctor: { id: doctorId },
      appointmentDate: new Date(appointmentDate),
      slotTime,
      status: 'Pending',
    });

    return await this.appointmentRepository.save(appointment);
  }

  // 2. Doctor apne sare appointments dekh sakay
  async getDoctorAppointments(doctorId: string) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .select([
        'appointment.id',
        'appointment.status',
        'appointment.appointmentDate',
        'appointment.slotTime',
        'appointment.videoCallUrl',
        'appointment.createdAt',
        'patient.id',
        'patient.email',
      ])
      .where('appointment.doctorId = :doctorId', { doctorId })
      .orderBy('appointment.createdAt', 'DESC')
      .getMany();
  }

  // 3. Patient apne sare appointments dekh sakay (Dashboard par status aur Video Link nazar aayega)
  async getPatientAppointments(patientId: string) {
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .select([
        'appointment.id',
        'appointment.status',
        'appointment.appointmentDate',
        'appointment.slotTime',
        'appointment.videoCallUrl',
        'appointment.createdAt',
        'doctor.id',
        'doctor.email',
        'doctor.specialization',
        'doctor.consultationFee',
      ])
      .where('appointment.patientId = :patientId', { patientId })
      .orderBy('appointment.createdAt', 'DESC')
      .getMany();
  }

  // 4. Doctor Video Call Link Add karega & Status automatically "Confirmed" ho jayega (QueryBuilder fix)
  async addVideoCallLink(appointmentId: string, doctorId: string, videoCallUrl: string) {
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .where('appointment.id = :appointmentId', { appointmentId })
      .getOne();

    if (!appointment) {
      throw new NotFoundException('Appointment not found.');
    }

    // Security Check: Sirf wahi doctor update kar sakta hai jiska appointment hai
    if (appointment.doctor.id !== doctorId) {
      throw new ForbiddenException('You are not authorized to update this appointment.');
    }

    appointment.videoCallUrl = videoCallUrl;
    appointment.status = 'Confirmed'; // Automated status update for Patient Dashboard

    return await this.appointmentRepository.save(appointment);
  }
// 5. Doctor ya Patient Appointment Status update kar sakein (QueryBuilder fix)
  async updateStatus(appointmentId: string, userId: string, status: string) {
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .where('appointment.id = :appointmentId', { appointmentId })
      .getOne();

    if (!appointment) {
      throw new NotFoundException('Appointment not found.');
    }

    if (appointment.doctor.id !== userId && appointment.patient.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this appointment.');
    }

    appointment.status = status;
    return await this.appointmentRepository.save(appointment);
  }
}