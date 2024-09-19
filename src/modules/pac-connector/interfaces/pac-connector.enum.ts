import { CallServiceName, CallServiceMethods } from '../modules/pac-call/interfaces/pac-call.enum';
import { ExtensionServiceName, ExtensionServiceMethods } from '../modules/pac-extension/interfaces/pac-extension.enum';
import { QueueServiceMethods, QueueServiceName } from '../modules/pac-queue/interfaces/pac-queue.enum';
import { SqlServiceMethods, SqlServiceName } from '../modules/pac-sql/interfaces/pac-sql.enum';

export type GrpcServiceName = SqlServiceName | CallServiceName | ExtensionServiceName | QueueServiceName;

export type GrpcServiceMethods = SqlServiceMethods | CallServiceMethods | ExtensionServiceMethods | QueueServiceMethods;
