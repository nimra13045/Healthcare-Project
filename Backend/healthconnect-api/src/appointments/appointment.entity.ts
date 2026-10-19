import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity.js';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Statuses: 'Pending', 'Confirmed', 'Completed', 'Cancelled'
  @Column({ default: 'Pending' })
  status: string;

  @Column()
  appointmentDate: Date;

  @Column({ nullable: true })
  slotTime: string; // E.g., "10:00 AM - 11:00 AM"

  @Column({ nullable: true })
  videoCallUrl: string; // Doctor yahan video call link paste karega

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  patient: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  doctor: User;

  @CreateDateColumn()
  createdAt: Date;
}