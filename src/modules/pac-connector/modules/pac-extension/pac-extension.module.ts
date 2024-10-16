import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacExtensionService } from './services/pac-extension.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacExtensionService],
    exports: [PacExtensionService],
})
export class PacExtensionModule {}
