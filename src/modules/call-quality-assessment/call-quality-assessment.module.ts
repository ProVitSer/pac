import { Module } from '@nestjs/common';
import { CallQualityAssessmentService } from './call-quality-assessment.service';

@Module({
    providers: [CallQualityAssessmentService],
})
export class CallQualityAssessmentModule {}
