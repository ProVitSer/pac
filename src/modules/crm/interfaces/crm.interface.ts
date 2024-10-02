import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { FullCallInfo } from '@app/modules/call-event-handler/interfaces/call-event-handler.interface';

export interface CrmCallData {
    callDireciton: CallDirection;
    callId: number;
    clientId: number;
    fullCallInfo: FullCallInfo;
}
