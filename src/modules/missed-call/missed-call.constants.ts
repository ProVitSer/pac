import { RoutingKey } from '@app/common/constants/amqp';
import { MissedServiceType } from './interfaces/missed-call.enum';

export const MISSQD_CALL_EVENT_KEY: { [code in MissedServiceType]: RoutingKey } = {
    [MissedServiceType.tg]: RoutingKey.callMissedTg,
    [MissedServiceType.crm]: RoutingKey.callMissedCrm,
    [MissedServiceType.sms]: RoutingKey.callMissedSms,
};
