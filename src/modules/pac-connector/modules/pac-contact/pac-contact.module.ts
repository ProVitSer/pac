import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacContactService } from './services/pac-contact.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacContactService],
    exports: [PacContactService],
})
export class PacContactModule {}
