import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity.js';
import type { Application } from './application.entity.js';

@Entity('internships')
export class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  organization: User;

  @OneToMany('Application', (application: any) => application.internship)
  applications: Application[];
}