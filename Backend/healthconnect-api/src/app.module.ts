import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { User } from './users/user.entity.js';
import { AiService } from './ai/ai.service.js';
import { AuthModule } from './auth/auth.module.js';
import { AiModule } from './ai/ai.module.js';
import { AdminModule } from './admin/admin.module.js';
import { Internship } from './internships/internship.entity.js';
import { Application } from './internships/application.entity.js';
import { InternshipModule } from './internships/internship.module.js';
import { Appointment } from './appointments/appointment.entity.js';
import { DoctorSchedule } from './doctors/doctor-schedule.entity.js';
import { DoctorModule } from './doctors/doctor.module.js';
import { AppointmentModule } from './appointments/appointment.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [User,Internship, Application,Appointment, DoctorSchedule],
        autoLoadEntities: true,
        synchronize: true, // Auto-creates table in Supabase
       
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    AiModule,
    AdminModule,
    InternshipModule,
    DoctorModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, AiService],
})
export class AppModule {}