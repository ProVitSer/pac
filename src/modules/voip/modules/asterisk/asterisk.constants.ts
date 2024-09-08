import { ApplicationServiceType } from '@app/common/interfaces/enums';
import { AsteriskContext } from './interfaces/asterisk.enum';

export const DEFAULT_RETRY_INTERVAL = 60;
export const DEFAULT_EXPIRATION = 120;
export const DEFAULT_FORBIDDEN_RETRY_INTERVAL = 60;
export const DEFAULT_MAX_RETRY = 300;
export const DEFAULT_MAX_CONTACTS = 10;
export const DEFAULT_QUALIFY_FREQUENCY = 30;
export const CREATE_TRUNK_ERROR = 'Ошибка добаление транка';

export const CONTEXT_BY_TRUNK_TYPE: { [code in ApplicationServiceType]: AsteriskContext } = {
    [ApplicationServiceType.cqa]: AsteriskContext.client_trunk,
    [ApplicationServiceType.dialer]: AsteriskContext.client_trunk,
};
