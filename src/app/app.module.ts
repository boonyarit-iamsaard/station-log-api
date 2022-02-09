import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        REDIS_TLS_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
  ],
})
export class AppModule {}
