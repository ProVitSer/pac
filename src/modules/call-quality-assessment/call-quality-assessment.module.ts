import { Module } from '@nestjs/common';
import { CallQualityAssessmentConfigService } from './services/call-quality-assessment-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from '../client/client.module';
import { CallQualityAssessmentStatistic } from './entities/call-quality-assessment-statistic.entity';
import { CallQualityAssessmentConfig } from './entities/call-quality-assessment.-config.entity';
import { Voip } from '../voip/entities/voip.entity';
import { CdrModule } from '../cdr/cdr.module';
import { AsteriskModule } from '../voip/modules/asterisk/asterisk.module';
import { VoipModule } from '../voip/voip.module';
import { CallQualityAssessmentApplication } from './application/call-quality-assessment.application';
import { AriModule } from '../voip/modules/asterisk/apis/ari/ari.module';
import { FilesModule } from '../files/files.module';
import { CallQualityAssessmentStatisticService } from './services/call-quality-assessment-statistic.service';
import { CallQualityAssessmentConfigController } from './controllers/call-quality-assessment-config.controller';
import { CallQualityAssessmentStatisticController } from './controllers/call-quality-assessment-statistic.controller';
import { AmqpModule } from '../amqp/amqp.module';
import { CqaEndCallListenters } from './listenters/cqa-end-call.listenters';
import { CallQualityAssessmentAddCallService } from './services/call-quality-assessment-add-call.service';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { ApiModule } from '../api/api.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CallQualityAssessmentStatistic, CallQualityAssessmentConfig, Voip]),
        ClientModule,
        AsteriskModule,
        VoipModule,
        CdrModule,
        AriModule,
        FilesModule,
        AmqpModule,
        PacSqlModule,
        ApiModule,
    ],
    providers: [
        CallQualityAssessmentStatisticService,
        CallQualityAssessmentConfigService,
        CallQualityAssessmentApplication,
        CqaEndCallListenters,
        CallQualityAssessmentAddCallService,
    ],
    controllers: [CallQualityAssessmentConfigController, CallQualityAssessmentStatisticController],
})
export class CallQualityAssessmentModule {}
