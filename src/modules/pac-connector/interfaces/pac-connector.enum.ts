import { CallServiceName, CallServiceMethods } from '../modules/pac-call/interfaces/pac-call.enum';
import { SqlServiceMethods, SqlServiceName } from '../modules/pac-sql/interfaces/pac-sql.enum';

export type GrpcServiceName = SqlServiceName | CallServiceName;

export type GrpcServiceMethods = SqlServiceMethods | CallServiceMethods;
