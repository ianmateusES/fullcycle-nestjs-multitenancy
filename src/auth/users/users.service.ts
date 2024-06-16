import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './enum/user-roles';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createPartnerUser(data: CreateUserDto) {
    const partnerUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (partnerUser) {
      throw new BadRequestException('Partner already exists');
    }

    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER],
      },
    });
  }

  async createCommonUser(data: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER],
      },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword({
    hash_password,
    password,
  }: {
    hash_password: string;
    password: string;
  }) {
    return bcrypt.compareSync(password, hash_password);
  }
}
