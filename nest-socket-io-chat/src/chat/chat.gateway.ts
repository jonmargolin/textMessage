import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { RabbitmqProducerService } from 'src/rabbitmq/rabbitmq.service';
import { MemoryService } from 'src/memory/memory.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:80',
  },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly rabbitmqProducerService: RabbitmqProducerService,
    private readonly memoryService: MemoryService,
  ) {}

  async afterInit(server: Server) {
    console.log('Socket.io server initialized');
    await this.rabbitmqProducerService.startConsuming('msg', (message) => {
      // Handle the received message here form thw queue and pass it the socket.
      const msg = JSON.parse(message);
      this.chatService.sendMessage(msg.data);
    });
  }
  @SubscribeMessage('join')
  handleJoinChat(client: Socket) {
    this.chatService.joinChat(client);
    const data = this.memoryService.getMemoryText();
    this.chatService.sendMessage(data);
  }
  @SubscribeMessage('message')
  async handleEvent(@MessageBody() data: string): Promise<string> {
    await this.rabbitmqProducerService.pushMessage('msg', data);
    this.memoryService.storeMemoryText(data);
    return data;
  }
  // Handle disconnect events
  handleDisconnect(client: Socket) {
    this.chatService.leaveChat(client);
  }
}
