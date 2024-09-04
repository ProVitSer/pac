import { AsteriskContext } from '../../interfaces/asterisk.enum';

export const DEFAULT_REOPEN_AMI_CLIENT = 5000;
export const AMI_RECONECT = 'Reconect to AMI ...';
export const AMI_INCORRECT_LOGIN = 'Incorrect login or password to AMI';
export const AMI_CONNECT_SUCCESS = 'Reconect to AMI success';
export const ERROR_AMI = 'AMI problem';
export const INVALIDE_PEER = 'Invalid AMI Salute. Not an AMI?';

export const AMI_ORIGINATE_OUTBOUND_CALL = {
    context: AsteriskContext.client_trunk,
    async: 'yes',
    priority: '1',
    timeout: '60000',
};