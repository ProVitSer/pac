import { Module } from '@nestjs/common';
import { PacContactModule } from '../pac-connector/modules/pac-contact/pac-contact.module';

@Module({
    imports: [PacContactModule],
})
export class ClientInfoModule {}
