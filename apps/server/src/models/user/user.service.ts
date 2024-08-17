import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@server/database/prisma/prisma.service';
import { AuthService } from '@server/features/auth/auth.service';
import { CreateUserDto, SearchUserDto } from '@shared/dtos';
import { TRPCError } from '@trpc/server';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const userExist = await this.prisma.user.findFirst({
      where: { name: createUserDto.name },
    });

    if (userExist) {
      // TODO: 这里可以考虑将throw的逻辑注入
      throw new TRPCError({
        message: 'username already exist',
        code: 'BAD_REQUEST',
      });
    }
    try {
      const result = await this.prisma.user.create({ data: createUserDto });
      return result;
    } catch (err) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }
  }

  findAll(searchUser: SearchUserDto) {
    const { name, nickname, email } = searchUser;
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
        nickname: {
          contains: nickname,
        },
        email: {
          contains: email,
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
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
