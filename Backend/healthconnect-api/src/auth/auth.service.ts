import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User, UserRole } from '../users/user.entity.js';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    // Nodemailer Transporter Setup
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async register(email: string, pass: string, role?: UserRole) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      role: role || UserRole.STUDENT,
    });

    await this.userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  async login(email: string, pass: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }

  // 1. Forgot Password Function (Generates Reset Link & Sends Email)
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    // Short-lived Reset Token (15 mins expiry)
    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { secret: process.env.JWT_SECRET || 'super_secret_jwt_key_12345', expiresIn: '15m' }
    );

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send Mail via Nodemailer
    try {
      await this.transporter.sendMail({
        from: `"HealthConnect Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🔐 Password Reset Request - HealthConnect AI',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0D9488;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested to reset your password for HealthConnect AI account.</p>
            <p>Please click the button below to set a new password. This link is valid for 15 minutes:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #0D9488; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 15px 0;">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });

      return { message: 'Password reset instructions sent to your email.' };
    } catch (error) {
      console.error('Email send failure:', error);
      throw new BadRequestException('Failed to send email. Please check SMTP configuration.');
    }
  }

  // 2. Reset Password Function (Verifies Token & Updates Password in Database)
  async resetPassword(token: string, newPass: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'super_secret_jwt_key_12345',
      });

      const user = await this.userRepository.findOne({ where: { id: decoded.sub } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Hash new password and save
      user.password = await bcrypt.hash(newPass, 10);
      await this.userRepository.save(user);

      return { message: 'Password updated successfully. You can now login with your new password.' };
    } catch (err) {
      throw new BadRequestException('Invalid or expired password reset token.');
    }
  }
}