import { createAsteriskAmi, getAsteriskAmiProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';

const asteriskAmiProviders = createAsteriskAmi();
const amiProvidersName = getAsteriskAmiProvidesName();

@Module({
    imports: [],
    providers: [asteriskAmiProviders],
    exports: [amiProvidersName],
})
export class AmiModule {}
