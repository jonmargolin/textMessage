import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryService {
  private memoryText: string = '';
  getMemoryText(): string {
    return this.memoryText;
  }
  storeMemoryText(memoryText: string): void {
    this.memoryText = `${this.memoryText}\n${memoryText}`;
  }
}
