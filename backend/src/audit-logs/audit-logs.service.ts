import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logAction(userId: string | undefined, action: string, description: string): Promise<AuditLog> {
    const log = this.auditLogRepository.create({
      action,
      description,
      user: userId ? { id: userId } as any : null
    });
    return this.auditLogRepository.save(log);
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
      take: 100 // default limit
    });
  }
}
