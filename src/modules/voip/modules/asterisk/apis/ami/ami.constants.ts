import { AsteriskContext } from '../../interfaces/asterisk.enum';
import { RegisterStatus } from './interfaces/ami.enum';

export const DEFAULT_REOPEN_AMI_CLIENT = 5000;
export const AMI_RECONECT = 'Reconect to AMI ...';
export const AMI_INCORRECT_LOGIN = 'Incorrect login or password to AMI';
export const AMI_CONNECT_SUCCESS = 'Reconect to AMI success';
export const ERROR_AMI = 'AMI problem';
export const INVALIDE_PEER = 'Invalid AMI Salute. Not an AMI?';
export const AMI_ORIGINATE_ERROR = 'Ami originate error';
export const AMI_ORIGINATE_OUTBOUND_CALL = {
    context: AsteriskContext.client_trunk,
    async: 'yes',
    priority: '1',
    timeout: '60000',
};

export const TRUNK_STATUS_DESCRIPTRION = 'Изменение статуса транка';
export const CHANGE_TRUNK_REGISTER_STATUS_DESCRIPTION_BY_STATUS: { [code in RegisterStatus]: string } = {
    [RegisterStatus.Failed]: 'Ошибка регистрации транка',
    [RegisterStatus.Registered]: 'Успешная регистрация, Транк в состояние UP',
    [RegisterStatus.Rejected]:
        'Проблемы с регистрация по транку, возможно проблема с корректностью авторизационных данных. Транк в состояние DOWN',
    [RegisterStatus.Unregistered]: 'Проблемы с регистрация по транку, возможно проблема с сетевой доступностью. Транк в состояние DOWN',
};
