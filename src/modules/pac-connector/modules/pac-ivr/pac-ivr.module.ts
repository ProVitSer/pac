import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';

@Module({
    imports: [PacConnectorModule],
    providers: [],
    exports: [],
})
export class PacIvrModule {}
