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

@Module({
    imports: [
        TypeOrmModule.forFeature([PsTransports, PsAors, PsAuths, PsEndpointIdIps, PsRegistrations, Extensions, PsEndpoints]),
        AmiModule,
        AriModule,
    ],
})
export class AsteriskModule {}
