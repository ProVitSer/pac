import { createAsteriskAmi, getAsteriskAmiProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AmiListenter } from './listenter/ami.listenter';
import { HangupEvent } from './events/hangup.event';
import { NewChannelEvent } from './events/new-channel.event';
import { RegistryEvent } from './events/registry.event';
import { VarSetEvent } from './events/var-set.event';

const asteriskAmiProviders = createAsteriskAmi();
const amiProvidersName = getAsteriskAmiProvidesName();

@Module({
    imports: [],
    providers: [asteriskAmiProviders, AmiListenter, NewChannelEvent, VarSetEvent, RegistryEvent, HangupEvent],
    exports: [amiProvidersName],
})
export class AmiModule {}
