import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);
  await app.listen(3001, '0.0.0.0');
  // await app.listen(process.env.port ?? 3001);
}
bootstrap();
