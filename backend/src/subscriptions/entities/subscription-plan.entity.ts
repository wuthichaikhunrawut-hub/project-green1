import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('subscription_plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // e.g. 'Basic', 'Pro', 'Enterprise'

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float', default: 0 })
  price_per_month: number;

  @Column({ type: 'int', default: 1 })
  max_users: number;

  @Column({ type: 'int', default: 1 })
  max_locations: number;

  @Column({ type: 'boolean', default: false })
  has_ai_scan: boolean;

  @Column({ type: 'boolean', default: false })
  has_green_office: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
