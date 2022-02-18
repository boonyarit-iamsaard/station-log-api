import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm';
import { getConnection } from 'typeorm';

import { AppModule } from './app/app.module';
import { QueryErrorExceptionFilter } from './common/filters/query-error-exception.filter';
import { SessionEntity } from './users/entities/session.entity';

import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const sessionRepository = getConnection().getRepository(SessionEntity);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({
    origin: 'http://localhost:3000', // must be specified
    credentials: true, // enable set cookie
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new QueryErrorExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
      },
      store: new TypeormStore({
        cleanupLimit: 10,
      }).connect(sessionRepository),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
}
bootstrap();
