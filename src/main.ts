import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { QueryErrorExceptionFilter } from './src/common/filters/query-error-exception.filter';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new QueryErrorExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());

  // TODO: research more about redis package, types and how to setup
  const RedisStore = createRedisStore(session);
  const redisClient = createClient({ url: process.env.REDIS_URL });

  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 12, // maxAge in milliseconds (12 hours)
      },
      store: new RedisStore({ client: redisClient }),
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
