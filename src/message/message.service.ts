import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    return this.prisma.message.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: number) {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.message.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
