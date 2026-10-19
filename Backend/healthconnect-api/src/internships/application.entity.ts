import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity.js';
import type { Internship } from './internship.entity.js';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Pending' })
  status: string; // Pending, Accepted, Rejected

  @CreateDateColumn()
  appliedAt: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  student: User;

  @ManyToOne('Internship', (internship: any) => internship.applications, { onDelete: 'CASCADE' })
  internship: Internship;
}