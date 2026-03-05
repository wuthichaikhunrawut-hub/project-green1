import { Controller, Get, Post, Body, Param, Delete, Headers, UnauthorizedException } from '@nestjs/common';
import { CarbonLogsService } from './carbon-logs.service';

@Controller('carbon-logs')
export class CarbonLogsController {
  constructor(private readonly carbonLogsService: CarbonLogsService) {}

  // Helper to extract mock Org ID for now
  private getOrgId(headers: any): number {
    const orgIdStr = headers['x-org-id'];
    if (!orgIdStr) throw new UnauthorizedException('Missing x-org-id header');
    const orgId = parseInt(orgIdStr, 10);
    if (isNaN(orgId)) throw new UnauthorizedException('Invalid x-org-id header');
    return orgId;
  }

  @Post()
  create(@Body() createDto: any, @Headers() headers: any) {
    return this.carbonLogsService.create(createDto, this.getOrgId(headers));
  }

  @Get()
  findAll(@Headers() headers: any) {
    return this.carbonLogsService.findAll(this.getOrgId(headers));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: any) {
    return this.carbonLogsService.remove(id, this.getOrgId(headers));
  }
}
