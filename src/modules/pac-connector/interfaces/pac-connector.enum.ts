import { CallServiceName, CallServiceMethods } from '../modules/pac-call/interfaces/pac-call.enum';
import { ContactServiceName, ContactServiceMethods } from '../modules/pac-contact/interfaces/pac-contact.enum';
import { ExtensionServiceName, ExtensionServiceMethods } from '../modules/pac-extension/interfaces/pac-extension.enum';
import { IvrServiceMethods, IvrServiceName } from '../modules/pac-ivr/interfaces/pac-ivr.enum';
import {
    PbxSubscribeEventServiceName,
    PbxSubscribeEventServiceMethods,
} from '../modules/pac-pbx-subscribe-event/interfaces/pac-pbx-subscribe-event.enum';
import { QueueServiceMethods, QueueServiceName } from '../modules/pac-queue/interfaces/pac-queue.enum';
import { RingGroupServiceMethods, RingGroupServiceName } from '../modules/pac-ring-group/interfaces/pac-ring-group.enum';
import { SqlServiceMethods, SqlServiceName } from '../modules/pac-sql/interfaces/pac-sql.enum';

export type GrpcServiceName =
    | SqlServiceName
    | CallServiceName
    | ExtensionServiceName
    | QueueServiceName
    | RingGroupServiceName
    | ContactServiceName
    | PbxSubscribeEventServiceName
    | IvrServiceName;

export type GrpcServiceMethods =
    | SqlServiceMethods
    | CallServiceMethods
    | ExtensionServiceMethods
    | QueueServiceMethods
    | RingGroupServiceMethods
    | ContactServiceMethods
    | PbxSubscribeEventServiceMethods
    | IvrServiceMethods;
