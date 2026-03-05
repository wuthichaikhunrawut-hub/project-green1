import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { Invoice } from './entities/invoice.entity';
import { AuditLogsService } from '../audit-logs/audit-logs.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private plansRepository: Repository<SubscriptionPlan>,
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private auditLogsService: AuditLogsService,
  ) {}

  // ---- Subscription Plans ----

  findAllPlans() {
    return this.plansRepository.find({ order: { price_per_month: 'ASC' } });
  }

  async createPlan(data: Partial<SubscriptionPlan>) {
    const plan = this.plansRepository.create(data);
    const saved = await this.plansRepository.save(plan);
    await this.auditLogsService.logAction(undefined, 'CREATE_PLAN', `Created subscription plan: ${saved.name}`);
    return saved;
  }

  async updatePlan(id: string, data: Partial<SubscriptionPlan>) {
    await this.plansRepository.update(id, data);
    const updated = await this.plansRepository.findOne({ where: { id } });
    await this.auditLogsService.logAction(undefined, 'UPDATE_PLAN', `Updated plan: ${updated?.name}`);
    return updated;
  }

  async removePlan(id: string) {
    const plan = await this.plansRepository.findOne({ where: { id } });
    await this.plansRepository.delete(id);
    if (plan) await this.auditLogsService.logAction(undefined, 'DELETE_PLAN', `Deleted plan: ${plan.name}`);
  }

  // ---- Invoices ----

  findAllInvoices() {
    return this.invoicesRepository.find({
      relations: ['organization', 'plan'],
      order: { created_at: 'DESC' },
    });
  }

  async updateInvoiceStatus(id: string, status: string) {
    await this.invoicesRepository.update(id, { status });
    return this.invoicesRepository.findOne({ where: { id }, relations: ['organization', 'plan'] });
  }
}
