import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extensions } from '../../entities/extensions.entity';
import { PsAors } from '../../entities/ps-aors.entity';
import { PsAuths } from '../../entities/ps-auths.entity';
import { PsEndpointIdIps } from '../../entities/ps-endpointId-ips.entity';
import { PsEndpoints } from '../../entities/ps-endpoints.entity';
import { PsRegistrations } from '../../entities/ps-registrations.entity';
import { PsTransports } from '../../entities/ps-transports.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PsTransports, PsAors, PsAuths, PsEndpointIdIps, PsRegistrations, Extensions, PsEndpoints])],
    exports: [],
    providers: [],
})
export class SorceryModule {}
