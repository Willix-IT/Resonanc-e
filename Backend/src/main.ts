import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Autoriser les requêtes depuis le front
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Méthodes HTTP autorisées
    credentials: true, // Autoriser l'envoi de cookies ou d'authentification
  });
  // Activer le ValidationPipe global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
