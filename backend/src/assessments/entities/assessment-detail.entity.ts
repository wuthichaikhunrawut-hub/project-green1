import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Assessment } from './assessment.entity';
import { GreenCriteriaMaster } from './green-criteria-master.entity';
import { EvidenceFile } from './evidence-file.entity';

@Entity('assessment_details')
export class AssessmentDetail {
  @PrimaryGeneratedColumn('increment', { name: 'assessment_detail_id' })
  id: number;

  @ManyToOne(() => Assessment, assessment => assessment.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assessment_id' })
  assessment: Assessment;

  @ManyToOne(() => GreenCriteriaMaster)
  @JoinColumn({ name: 'criteria_id' })
  criteria: GreenCriteriaMaster;

  @Column({ name: 'self_score', type: 'float', default: 0 })
  self_score: number;

  @Column({ name: 'applicant_comment', type: 'text', nullable: true })
  applicant_comment: string;

  @Column({ name: 'assessor_score', type: 'float', default: 0 })
  assessor_score: number;

  @Column({ name: 'auditor_comment', type: 'text', nullable: true })
  auditor_comment: string;

  @OneToMany(() => EvidenceFile, file => file.assessment_detail, { cascade: true })
  evidence_files: EvidenceFile[];
}
