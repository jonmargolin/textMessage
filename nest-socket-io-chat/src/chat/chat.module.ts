import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MemoryModule } from 'src/memory/memory.module';
import { RabbitmqProducerModule } from 'src/rabbitmq/rabbitmq-producer.module';


@Module({
  imports: [MemoryModule, RabbitmqProducerModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
