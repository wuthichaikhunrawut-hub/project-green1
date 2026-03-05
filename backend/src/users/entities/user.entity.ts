import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Assessment } from '../../assessments/entities/assessment.entity';
import { AssessorProfile } from './assessor-profile.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  ASSESSOR = 'ASSESSOR',
  USER = 'USER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  assessor_verified: boolean;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bank_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bank_account_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bank_account_number: string;

  @Column({ type: 'varchar', default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Organization, (org) => org.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  // Added references for Assessor relationships (reverse side)
  // Assessor's assigned assessments
  @OneToMany(() => Assessment, assessment => assessment.assessor)
  assessments: Assessment[];

  @OneToOne(() => AssessorProfile, profile => profile.user)
  assessor_profile: AssessorProfile;
}
