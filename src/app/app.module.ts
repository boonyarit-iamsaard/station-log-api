import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),
    DatabaseModule,
    HealthModule,
    UsersModule,
  ],
})
export class AppModule {}
