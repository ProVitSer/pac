import { createAsteriskAmi, getAsteriskAmiProvidesName } from '@app/common/config/asterisk.config';
import { Module } from '@nestjs/common';
import { AmiListenter } from './listenter/ami.listenter';
import { HangupEvent } from './events/hangup.event';
import { NewChannelEvent } from './events/new-channel.event';
import { RegistryEvent } from './events/registry.event';
import { VarSetEvent } from './events/var-set.event';
import { BaseAction } from './actions/base.action';
import { OriginateAction } from './actions/originate.action';
import { PjsipShowRegistrationsOutboundAction } from './actions/pjsip-show-registrations-outbound.action';
import { SendResiterAction } from './actions/send-register.action';
import { OutboundRegistrationDetailEvent } from './events/outbound-registration-detail.event';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsRegistrations } from '../../entities/ps-registrations.entity';
import { NotificationsModule } from '@app/modules/notifications/notifications.module';

const asteriskAmiProviders = createAsteriskAmi();
const amiProvidersName = getAsteriskAmiProvidesName();

@Module({
    imports: [TypeOrmModule.forFeature([Voip, PsRegistrations]), NotificationsModule],
    providers: [
        asteriskAmiProviders,
        AmiListenter,
        NewChannelEvent,
        VarSetEvent,
        RegistryEvent,
        HangupEvent,
        BaseAction,
        OriginateAction,
        PjsipShowRegistrationsOutboundAction,
        OutboundRegistrationDetailEvent,
        SendResiterAction,
    ],
    exports: [amiProvidersName, OriginateAction, PjsipShowRegistrationsOutboundAction, SendResiterAction, AmiListenter],
})
export class AmiModule {}
