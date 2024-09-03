import { createAsteriskAmi, getAsteriskAmiProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AmiListenter } from './listenter/ami.listenter';

const asteriskAmiProviders = createAsteriskAmi();
const amiProvidersName = getAsteriskAmiProvidesName();

@Module({
    imports: [],
    providers: [asteriskAmiProviders, AmiListenter],
    exports: [amiProvidersName],
})
export class AmiModule {}
