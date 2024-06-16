import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private tenantService: TenantService,
    private prismaService: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const partner = await this.prismaService.partnerUser.findFirst({
      where: { userId: user.id },
      include: { Partner: true },
    });

    if (!partner) {
      throw new NotFoundException('User not have a partner');
    }

    this.tenantService.setTenant(partner.Partner);

    return next.handle();
  }
}
