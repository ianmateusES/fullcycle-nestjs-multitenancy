import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class EventsService {
  constructor(
    private prismaService: PrismaService,
    private tenantService: TenantService,
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        partnerId: this.tenantService.getTenant().id,
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany({
      where: {
        partnerId: this.tenantService.getTenant().id,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        id,
        partnerId: this.tenantService.getTenant().id,
      },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
