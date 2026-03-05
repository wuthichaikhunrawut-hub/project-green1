import { PartialType } from '@nestjs/mapped-types';
import { CreateAssessmentDto } from './create-assessment.dto';

export class UpdateAssessmentDto extends PartialType(CreateAssessmentDto) {
  details?: {
    assessment_detail_id: number;
    assessor_score: number;
    auditor_comment: string;
  }[];
}
