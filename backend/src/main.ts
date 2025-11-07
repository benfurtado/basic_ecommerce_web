import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean); // Remove undefined values

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, // Allow all in dev if no URL set
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}`);
}

bootstrap();

