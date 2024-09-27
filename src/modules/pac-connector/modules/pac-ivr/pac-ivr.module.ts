import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacIvrService } from './services/pac-ivr.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacIvrService],
    exports: [PacIvrService],
})
export class PacIvrModule {}
