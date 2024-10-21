import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Use cors middleware
  app.use(cors({
    origin : 'http://localhost:54335',
    methods : "POST, PUT, GET, PATCH, DELETE",
    allowedHeaders: 'Content-Type, Authorization',
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
