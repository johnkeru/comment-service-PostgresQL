import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common';

const logger = new Logger('Comment 🍲');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
      options: {
        urls: ['amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
        queue: 'comment_queue',
        queueOptions: {
          durable: false
        },
      },
  })
  app.listen()
  logger.log('🚀 Comment service is on fire🔥');
}
bootstrap();
