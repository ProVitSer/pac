import { Module } from '@nestjs/common';
import { SmartRoutingService } from './services/smart-routing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartRouting } from './entities/smart-routing.entity';
import { SmartRoutingController } from './controllers/smart-routing.controller';
import { BitrixSmartRoutingProvider } from './providers/bitrix-smart-routing.provider';
import { CustomSmartRoutingProvider } from './providers/custom-smart-routing.provider';
import { PhonebookSmartRoutingProvider } from './providers/phonebook-smart-routing.provider';

@Module({
    imports: [TypeOrmModule.forFeature([SmartRouting])],
    controllers: [SmartRoutingController],
    providers: [SmartRoutingService, PhonebookSmartRoutingProvider, CustomSmartRoutingProvider, BitrixSmartRoutingProvider],
})
export class SmartRoutingModule {}
