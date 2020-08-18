// importing newrelic
import newrelic from 'newrelic';

// using the newrelic object so it doesn't' get optimized out by the compiler
console.log(newrelic)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
