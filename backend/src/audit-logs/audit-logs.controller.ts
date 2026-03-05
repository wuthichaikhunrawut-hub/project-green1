import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  // @UseGuards(AdminRoleGuard) -> Normally we would add a Guard here
  findAll() {
    return this.auditLogsService.findAll();
  }
}
