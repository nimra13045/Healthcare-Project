import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  PATIENT = 'patient',
  DOCTOR = 'doctor', 
  ORGANIZATION = 'organization', 
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  // --- Doctor Specific Fields ---
  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true, type: 'decimal' })
  consultationFee: number;

  @Column({ default: false })
  isVerified: boolean; // Jab tak admin verify na kare, false rahega (frontend gating ke liye)

  @Column({ default: false })
  isTopDoctor: boolean; // Home page par top doctors show karne ke liye

  @CreateDateColumn()
  createdAt: Date;
}