// src/socket/socket.module.ts

import { Module } from '@nestjs/common';
import { ChatGateway } from '../chat/chat.gateway';
import { ChatService } from '../chat/chat.service';

@Module({
  providers: [ChatService, ChatGateway],
})
export class SocketModule {}
