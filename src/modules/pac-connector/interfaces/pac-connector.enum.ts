import { CallServiceName, CallServiceMethods } from '../modules/pac-call/interfaces/pac-call.enum';
import { ContactServiceName, ContactServiceMethods } from '../modules/pac-contact/interfaces/pac-contact.enum';
import { ExtensionServiceName, ExtensionServiceMethods } from '../modules/pac-extension/interfaces/pac-extension.enum';
import { QueueServiceMethods, QueueServiceName } from '../modules/pac-queue/interfaces/pac-queue.enum';
import { RingGroupServiceMethods, RingGroupServiceName } from '../modules/pac-ring-group/interfaces/pac-ring-group.enum';
import { SqlServiceMethods, SqlServiceName } from '../modules/pac-sql/interfaces/pac-sql.enum';

export type GrpcServiceName =
    | SqlServiceName
    | CallServiceName
    | ExtensionServiceName
    | QueueServiceName
    | RingGroupServiceName
    | ContactServiceName;

export type GrpcServiceMethods =
    | SqlServiceMethods
    | CallServiceMethods
    | ExtensionServiceMethods
    | QueueServiceMethods
    | RingGroupServiceMethods
    | ContactServiceMethods;
