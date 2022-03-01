import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { QueryErrorExceptionFilter } from './common/filters/query-error-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({
    origin: process.env.ORIGIN_URL || 'http://localhost:3000', // must be specified
    credentials: true, // enable set cookie
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new QueryErrorExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(port);
}

bootstrap();
