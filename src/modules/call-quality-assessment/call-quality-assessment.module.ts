import { Module } from '@nestjs/common';
import { CallQualityAssessmentService } from './services/call-quality-assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { CallQualityAssessmentStatistic } from './entities/call-quality-assessment.-statistic.entity';
import { CallQualityAssessmentConfig } from './entities/call-quality-assessment.-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CallQualityAssessmentStatistic, CallQualityAssessmentConfig]), ClientModule],
    providers: [CallQualityAssessmentService],
    exports: [CallQualityAssessmentService],
})
export class CallQualityAssessmentModule {}
