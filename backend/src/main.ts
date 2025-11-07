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

  // If FRONTEND_URL is not set, allow all origins (useful for IP-based deployment)
  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true, // Allow all in dev if no URL set
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3001;
  const host = process.env.HOST || '0.0.0.0'; // Listen on all interfaces to accept connections from IP
  await app.listen(port, host);
  console.log(`Backend server running on http://${host}:${port}`);
  console.log(`Backend accessible at http://0.0.0.0:${port} or http://<your-ip>:${port}`);
}

bootstrap();

