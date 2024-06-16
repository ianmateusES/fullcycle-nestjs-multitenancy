import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../users/enum/user-roles';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
