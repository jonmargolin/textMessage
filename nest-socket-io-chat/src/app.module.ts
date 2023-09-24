import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { RabbitmqProducerModule } from './rabbitmq/rabbitmq-producer.module';

@Module({
  imports: [ChatModule, RabbitmqProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
