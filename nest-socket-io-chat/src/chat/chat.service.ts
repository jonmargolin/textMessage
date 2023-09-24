import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private clients: Socket[] = [];

  joinChat(client: Socket) {
    this.clients.push(client);
  }

  leaveChat(client: Socket) {
    this.clients = this.clients.filter((c) => c !== client);
  }

  sendMessage(message: string) {
    this.clients.forEach((client) => {
      client.emit('message', message);
    });
  }
}
