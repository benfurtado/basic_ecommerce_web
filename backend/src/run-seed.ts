import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedProducts } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get the DataSource from the app
  const dataSource = app.get(DataSource);
  
  // Seed products
  await seedProducts(dataSource);
  
  await app.close();
  process.exit(0);
}

bootstrap();

