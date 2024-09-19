import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacQueueService } from './services/pac-queue.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacQueueService],
    exports: [PacQueueService],
})
export class PacQueueModule {}
