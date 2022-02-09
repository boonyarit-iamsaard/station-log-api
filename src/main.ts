import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { QueryErrorExceptionFilter } from './src/common/filters/query-error-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new QueryErrorExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
