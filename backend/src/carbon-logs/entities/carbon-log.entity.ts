import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';

export enum ActivitySource {
  MANUAL = 'MANUAL',
  AI_OCR = 'AI_OCR',
}

@Entity('carbon_activity_logs')
export class CarbonLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string; // format: YYYY-MM-DD

  @Column({ type: 'varchar' })
  type: string; // e.g., 'Electricity', 'Water', 'Gasoline'

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string; // e.g., 'kWh', 'm3', 'Litre'

  @Column({ type: 'float' })
  emission: number; // calculated co2e

  @Column({ type: 'varchar', default: ActivitySource.MANUAL })
  source: ActivitySource;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Organization, (org) => org.carbon_logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization: Organization;
}
