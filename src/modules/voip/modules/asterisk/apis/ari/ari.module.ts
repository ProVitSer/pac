import { createAsteriskAri, getAsteriskAriProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';

const asteriskAriProviders = createAsteriskAri();
const ariProvidersName = getAsteriskAriProvidesName();

@Module({
    imports: [],
    providers: [...asteriskAriProviders],
    exports: [...ariProvidersName],
})
export class AriModule {}
