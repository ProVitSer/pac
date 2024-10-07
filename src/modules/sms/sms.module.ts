import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsConfig } from './entities/sms-config.entity';
import { Sms } from './entities/sms.entity';
import { SmsConfigController } from './controllers/sms-config.controller';
import { SmsConfigService } from './services/sms-config.service';
import { SmscService } from './services/smsc.service';
import { SmsService } from './services/sms.service';
import { SmsController } from './controllers/sms.controller';
import { HttpModule } from '@nestjs/axios';
import { SmscApiService } from './services/smsc-api.service';
import { CheckSmsSendingStatusSchedule } from './schedules/check-sms-sending-status.schedule';
import { SmsMissedCallListenters } from './listenters/sms-missed-call.listenters';

@Module({
    imports: [TypeOrmModule.forFeature([Sms, SmsConfig]), HttpModule],
    controllers: [SmsConfigController, SmsController],
    providers: [SmsConfigService, SmscService, SmsService, SmscApiService, CheckSmsSendingStatusSchedule, SmsMissedCallListenters],
    exports: [SmsService],
})
export class SmsModule {}
