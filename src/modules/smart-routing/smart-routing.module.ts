import { Module } from '@nestjs/common';
import { SmartRoutingProvidersService } from './services/smart-routing-providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartRouting } from './entities/smart-routing.entity';
import { SmartRoutingController } from './controllers/smart-routing.controller';
import { BitrixSmartRoutingProvider } from './providers/bitrix-smart-routing.provider';
import { CustomSmartRoutingProvider } from './providers/custom-smart-routing.provider';
import { PhonebookSmartRoutingProvider } from './providers/phonebook-smart-routing.provider';
import { PacContactModule } from '../pac-connector/modules/pac-contact/pac-contact.module';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { PacIvrModule } from '../pac-connector/modules/pac-ivr/pac-ivr.module';
import { SmartRoutingService } from './services/smart-routing.service';

@Module({
    imports: [TypeOrmModule.forFeature([SmartRouting]), PacContactModule, PacSqlModule, PacIvrModule],
    controllers: [SmartRoutingController],
    providers: [
        SmartRoutingProvidersService,
        PhonebookSmartRoutingProvider,
        CustomSmartRoutingProvider,
        BitrixSmartRoutingProvider,
        SmartRoutingService,
    ],
    exports: [SmartRoutingProvidersService],
})
export class SmartRoutingModule {}
