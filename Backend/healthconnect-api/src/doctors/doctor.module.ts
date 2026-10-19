import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor.service.js';
import { DoctorController } from './doctor.controller.js';
import { User } from '../users/user.entity.js';
import { DoctorSchedule } from './doctor-schedule.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, DoctorSchedule])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}