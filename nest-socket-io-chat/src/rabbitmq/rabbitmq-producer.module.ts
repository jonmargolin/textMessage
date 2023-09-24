// // rabbitmq-producer.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqProducerService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_PRODUCER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], // RabbitMQ server URL
          queue: 'msg', // Queue name to send messages to,
        },
      },
    ]),
  ],
  providers: [RabbitmqProducerService],
  exports: [RabbitmqProducerService],
})
export class RabbitmqProducerModule {}
