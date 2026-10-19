import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS enable karein taake Frontend bina restriction ke requests bhej sake
  app.enableCors({
    origin: '*', // Production mein aap specific frontend URL bhi de sakti hain (e.g. 'https://your-frontend.vercel.app')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();