import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { AssessmentDetail } from './assessment-detail.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn('increment', { name: 'assessment_id' })
  id: number;

  @ManyToOne(() => Organization, (organization) => organization.assessments)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @ManyToOne(() => User, (user) => user.assessments)
  @JoinColumn({ name: 'assessor_user_id' })
  assessor: User;

  @Column({ name: 'assessment_year', type: 'int', nullable: true })
  assessment_year: number;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @Column({ name: 'total_score', type: 'float', default: 0 })
  total_score: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'certified_level', type: 'varchar', length: 50, nullable: true })
  certified_level: string;

  @CreateDateColumn({ name: 'submitted_at' })
  submitted_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => AssessmentDetail, (detail) => detail.assessment, { cascade: true })
  details: AssessmentDetail[];
}
