import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@server/database/prisma/prisma.service';
import { AuthService } from '@server/features/auth/auth.service';
import { CreateUserDto } from '@shared/validation';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.prisma.user.findFirst({
      where: { name: createUserDto.name },
    });
    if (userExist) {
      throw new HttpException('username already exist', HttpStatus.BAD_REQUEST);
    }
    const result = await this.prisma.user.create({ data: createUserDto });

    return result;
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    // const userExist = await this.prisma.user.findFirst({
    //   where: { name: createUserDto.name },
    // });
    const res = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return res;
  }

  async deleteOne(id: string) {
    const res = await this.prisma.user.delete({ where: { id } });
    return res;
  }

  findByName(name: string) {
    return this.prisma.user.findUnique({
      where: {
        name,
      },
    });
  }
}
