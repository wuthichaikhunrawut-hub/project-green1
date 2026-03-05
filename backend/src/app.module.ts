import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarbonLogsModule } from './carbon-logs/carbon-logs.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'greensync.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    GeminiModule,
    OrganizationsModule,
    UsersModule,
    AuthModule,
    CarbonLogsModule,
    AssessmentsModule,
    AuditLogsModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
