import { createAsteriskAri, getAsteriskAriProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AriService } from './services/ari.service';
import { CallQualityAssessmentApplication } from './applications/call-quality-assessment.application';

const asteriskAriProviders = createAsteriskAri();
const ariProvidersName = getAsteriskAriProvidesName();

@Module({
    imports: [],
    providers: [...asteriskAriProviders, AriService, CallQualityAssessmentApplication],
    exports: [...ariProvidersName, AriService],
})
export class AriModule {}
