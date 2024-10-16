import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacRingGroupService } from './services/pac-ring-group.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacRingGroupService],
    exports: [PacRingGroupService],
})
export class PacRingGroupModule {}
