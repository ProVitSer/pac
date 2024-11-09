import { Injectable } from '@nestjs/common';
import { GetRotingInfoData, IncomingCallData, SmartRoutingProvider } from '../interfaces/smart-routing.interface';

@Injectable()
export class CustomSmartRoutingProvider implements SmartRoutingProvider {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoData> {
        throw new Error('Method not implemented.');
    }
}
