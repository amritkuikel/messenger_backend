import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  private clients: Set<string> = new Set();
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        name: data.name,
        isGroup: data.isGroup,
        users: {
          connect: data.userIds.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.chat.findMany({
      include: {
        users: true,
        messages: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.chat.update({
      where: { id },
      data: {
        isGroup: data.isGroup,
        users: {
          connect: data.userIds.map((userId: number) => ({ id: userId })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.chat.delete({
      where: { id },
    });
  }

  async findUserChats(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Chat: {
          include: {
            users: true,
            messages: true,
          },
        },
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      chats: user.Chat,
    };
  }

  registerClient(clientId: string) {
    this.clients.add(clientId);
    console.log(`Registered client: ${clientId}`);
  }

  unregisterClient(clientId: string) {
    this.clients.delete(clientId);
    console.log(`Unregistered client: ${clientId}`);
  }
}
