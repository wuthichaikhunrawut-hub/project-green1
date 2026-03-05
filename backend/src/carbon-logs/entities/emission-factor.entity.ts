import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('emission_factors')
export class EmissionFactor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  category: string; // e.g. 'Electricity', 'Water', 'Fuel'

  @Column({ type: 'varchar', length: 200 })
  type_name: string; // e.g. 'MEA Electricity', 'Diesel'

  @Column({ type: 'varchar', length: 50 })
  unit: string; // e.g. 'kWh', 'liters'

  @Column({ type: 'float' })
  factor_value: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  gwp_version: string; // e.g. 'IPCC AR6'

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
