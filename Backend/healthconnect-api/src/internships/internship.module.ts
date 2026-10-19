import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from './internship.entity.js';
import { Application } from './application.entity.js';
import { InternshipService } from './internship.service.js';
import { InternshipController } from './internship.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Internship, Application]), AuthModule],
  controllers: [InternshipController],
  providers: [InternshipService],
})
export class InternshipModule {}