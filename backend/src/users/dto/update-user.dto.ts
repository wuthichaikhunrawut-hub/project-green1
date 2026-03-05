import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  username?: string;
  email?: string;
  role?: UserRole;
  is_active?: boolean;
}
