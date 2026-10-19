import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity('doctor_schedules')
export class DoctorSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayOfWeek: string; // E.g., "Monday", "Tuesday"

  @Column()
  startTime: string; // E.g., "09:00 AM"

  @Column()
  endTime: string; // E.g., "02:00 PM"

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  doctor: User;
}