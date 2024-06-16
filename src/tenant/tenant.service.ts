import { Injectable } from '@nestjs/common';
import { Partner } from '@prisma/client';

@Injectable()
export class TenantService {
  private tenant: Partner;

  getTenant(): Partner {
    return this.tenant;
  }

  setTenant(tenant: Partner) {
    this.tenant = tenant;
  }
}
