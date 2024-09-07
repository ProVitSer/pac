import { Module } from '@nestjs/common';
import { AmiModule } from './apis/ami/ami.module';
import { AriModule } from './apis/ari/ari.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extensions } from './entities/extensions.entity';
import { PsAors } from './entities/ps-aors.entity';
import { PsAuths } from './entities/ps-auths.entity';
import { PsEndpointIdIps } from './entities/ps-endpointId-ips.entity';
import { PsEndpoints } from './entities/ps-endpoints.entity';
import { PsRegistrations } from './entities/ps-registrations.entity';
import { PsTransports } from './entities/ps-transports.entity';
import { AriService } from './apis/ari/services/ari.service';
import { OriginateAction } from './apis/ami/actions/originate.action';
import { SendResiterAction } from './apis/ami/actions/send-register.action';
import { AstersikService } from './services/asterisk.service';
import { SorceryService } from './services/sorcery.service';
import { AmiListenter } from './apis/ami/listenter/ami.listenter';
import { NewChannelEvent } from './apis/ami/events/new-channel.event';
import { HangupEvent } from './apis/ami/events/hangup.event';
import { RegistryEvent } from './apis/ami/events/registry.event';
import { VarSetEvent } from './apis/ami/events/var-set.event';
import { PjsipShowRegistrationsOutboundAction } from './apis/ami/actions/pjsip-show-registrations-outbound.action';
import { OutboundRegistrationDetailEvent } from './apis/ami/events/outbound-registration-detail.event';
import { Voip } from '../../entities/voip.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PsTransports, PsAors, PsAuths, PsEndpointIdIps, PsRegistrations, Extensions, PsEndpoints, Voip]),
        AmiModule,
        AriModule,
    ],
    providers: [
        { provide: 'Asterisk', useClass: AstersikService },
        AriService,
        OriginateAction,
        SendResiterAction,
        PjsipShowRegistrationsOutboundAction,
        SorceryService,
        AmiListenter,
        NewChannelEvent,
        VarSetEvent,
        RegistryEvent,
        HangupEvent,
        OutboundRegistrationDetailEvent,
    ],
    exports: ['Asterisk'],
})
export class AsteriskModule {}
