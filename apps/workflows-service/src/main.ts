import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);
  // 启用参数验证
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
      },
    },
    {
      // 配置其他的微服务，继承主服务的配置
      inheritAppConfig: true,
    },
  );

  await app.startAllMicroservices();
  await app.listen(3001, '0.0.0.0');
  // await app.listen(process.env.port ?? 3001);
}
bootstrap();
