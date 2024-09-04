import { createAsteriskAmi, getAsteriskAmiProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AmiListenter } from './listenter/ami.listenter';
import { HangupEvent } from './events/hangup.event';
import { NewChannelEvent } from './events/new-channel.event';
import { RegistryEvent } from './events/registry.event';
import { VarSetEvent } from './events/var-set.event';
import { BaseAction } from './actions/base.action';
import { OriginateAction } from './actions/originate.action';
import { RegistrationStatusAction } from './actions/registration-status.action';
import { SendResiterAction } from './actions/send-register.action';

const asteriskAmiProviders = createAsteriskAmi();
const amiProvidersName = getAsteriskAmiProvidesName();

@Module({
    providers: [
        asteriskAmiProviders,
        AmiListenter,
        NewChannelEvent,
        VarSetEvent,
        RegistryEvent,
        HangupEvent,
        BaseAction,
        OriginateAction,
        RegistrationStatusAction,
        SendResiterAction,
    ],
    exports: [amiProvidersName],
})
export class AmiModule {}
