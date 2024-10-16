import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { FullCallInfo } from '@app/modules/call-event-handler/interfaces/call-event-handler.interface';

export interface CallAnaliticsData {
    callDireciton: CallDirection;
    fullCallInfo: FullCallInfo[];
    callId: number;
    clientId: number;
}
