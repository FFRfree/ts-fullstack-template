import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/database/prisma/prisma.service';
import { CreateUserDto } from '@shared/validation';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    await this.prisma.user.create({ data: createUserDto });
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByName(name: string) {
    return this.prisma.user.findUnique({
      where: {
        name,
      },
    });
  }
}
