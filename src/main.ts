import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://messenger-frontend-orpin.vercel.app',
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
