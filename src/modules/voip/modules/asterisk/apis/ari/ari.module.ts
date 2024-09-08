import { createAsteriskAri, getAsteriskAriProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AriService } from './services/ari.service';
import { CallQualityAssessmentApplication } from './applications/call-quality-assessment.application';
import { FilesModule } from '@app/modules/files/files.module';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsRegistrations } from '../../entities/ps-registrations.entity';

const asteriskAriProviders = createAsteriskAri();
const ariProvidersName = getAsteriskAriProvidesName();

@Module({
    imports: [FilesModule, TypeOrmModule.forFeature([Voip, PsRegistrations])],
    providers: [...asteriskAriProviders, AriService, CallQualityAssessmentApplication],
    exports: [...ariProvidersName, AriService],
})
export class AriModule {}
