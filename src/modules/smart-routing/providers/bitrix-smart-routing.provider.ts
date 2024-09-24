import { Injectable } from '@nestjs/common';
import { GetRotingInfoData, IncomingCallData, SmartRoutingProvider } from '../interfaces/smart-routing.interface';

@Injectable()
export class BitrixSmartRoutingProvider implements SmartRoutingProvider {
    getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoData> {
        throw new Error('Method not implemented.');
    }
}
