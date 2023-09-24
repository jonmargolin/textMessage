import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqProducerService implements OnApplicationShutdown {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  constructor(
    @Inject('RABBITMQ_PRODUCER') private readonly client: ClientProxy,
  ) {}

  async pushMessage(queueName: string, message: any): Promise<void> {
    await this.client.emit(queueName, message).toPromise();
  }

  async startConsuming(queueName: string, callback: (message: string) => void) {
    this.connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672'); // Replace with your RabbitMQ server URL
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue(queueName);

    await this.channel.consume(queueName, (message) => {
      if (message !== null) {
        const content = message.content.toString();
        callback(content);
        this.channel.ack(message);
      }
    });
  }
  async onApplicationShutdown(signal?: string) {
    console.log(`Shutting down Nest.js application with signal: ${signal}`);
    if (this.channel) {
      await this.channel.close();
    }
  }
}
