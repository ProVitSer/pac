import { ActiveCallsStatus, CallDirection } from '@app/modules/pac-connector/modules/pac-call/interfaces/pac-call.enum';
import { ApiActiveCallsStatus, ApiCallDirection } from './interfaces/api-call.enum';

export const CALL_DIRECTION_TO_API_CALL_DIRECTION: { [code in CallDirection]: ApiCallDirection } = {
    [CallDirection.Inbound]: ApiCallDirection.Inbound,
    [CallDirection.Outbound]: ApiCallDirection.Outbound,
    [CallDirection.Local]: ApiCallDirection.Local,
};

export const CALL_STATUS_TO_API_CALL_STATUS: { [code in ActiveCallsStatus]: ApiActiveCallsStatus } = {
    [ActiveCallsStatus.Dialing]: ApiActiveCallsStatus.Dialing,
    [ActiveCallsStatus.Ringing]: ApiActiveCallsStatus.Ringing,
    [ActiveCallsStatus.Talking]: ApiActiveCallsStatus.Talking,
    [ActiveCallsStatus.Other]: ApiActiveCallsStatus.Other,
    [ActiveCallsStatus.Finish]: ApiActiveCallsStatus.Finish,
};
