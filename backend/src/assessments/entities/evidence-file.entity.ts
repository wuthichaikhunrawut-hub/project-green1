import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AssessmentDetail } from './assessment-detail.entity';
import { User } from '../../users/entities/user.entity';

@Entity('evidence_files')
export class EvidenceFile {
  @PrimaryGeneratedColumn('increment', { name: 'evidence_file_id' })
  id: number;

  @ManyToOne(() => AssessmentDetail, detail => detail.evidence_files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assessment_detail_id' })
  assessment_detail: AssessmentDetail;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  file_name: string;

  @Column({ name: 'file_url', type: 'varchar', length: 255 })
  file_url: string;

  @Column({ name: 'file_type', type: 'varchar', length: 50, nullable: true })
  file_type: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploaded_by_user_id' })
  uploaded_by: User;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploaded_at: Date;
}
