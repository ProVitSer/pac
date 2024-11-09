import { SmscErrorCode, SmscStatus, SmsSendStatus } from './interfaces/sms.enum';

export const DEFAULTMISSED_CALL_SMS_TEXT = 'Здравствуйте, к сожалению все менеджеры были заняты, мы свяжемся с вами в ближашйее время!';

export const SMSC_STATUS_DESCRIPTION: { [state in SmscStatus]: string } = {
    [SmscStatus.SmsNotFound]: 'Сообщение не найдено',
    [SmscStatus.Stop]: 'Остановлено',
    [SmscStatus.WaitingSent]: 'Ожидает отправки',
    [SmscStatus.PassedOperator]: 'Сообщение было передано на SMS-центр оператора для доставки',
    [SmscStatus.SuccessfullySent]: 'Сообщение было успешно доставлено абоненту',
    [SmscStatus.MessageRead]: 'Сообщение было прочитано',
    [SmscStatus.Overdue]: 'Просрочено',
    [SmscStatus.ClickLink]: 'Сообщение было доставлено, и абонентом была нажата короткая ссылка',
    [SmscStatus.UnableDeliver]: 'Невозможно доставить',
    [SmscStatus.IncorrectPhone]: 'Неправильный формат номера телефона',
    [SmscStatus.Forbidden]: 'Запрещено',
    [SmscStatus.InsufficientFunds]: 'Недостаточно средств',
    [SmscStatus.UnavailableNumber]: 'Недоступный номер',
};

export const SMSC_ERROR_CODE_DESCRIPTION: { [state in SmscErrorCode]: string } = {
    [SmscErrorCode.ErrorInParameters]: 'Ошибка в параметрах',
    [SmscErrorCode.IncorrectLoginOrPass]: 'Неверный логин или пароль',
    [SmscErrorCode.InsufficientFunds]: 'Недостаточно средств на счете Клиента',
    [SmscErrorCode.IpBlock]: 'IP-адрес временно заблокирован из-за частых ошибок в запросах',
    [SmscErrorCode.DateFormatError]: 'Неверный формат даты',
    [SmscErrorCode.MessageForbidden]: 'Сообщение запрещено',
    [SmscErrorCode.IncorrectPhone]: 'Неверный формат номера телефона',
    [SmscErrorCode.CannotBeDelivered]: 'Сообщение на указанный номер не может быть доставлено',
    [SmscErrorCode.DuplicateError]: 'Множественная отправка',
};

export const SMSC_STATUS_TO_SMS_STATUS: { [state in SmscStatus]: SmsSendStatus } = {
    [SmscStatus.SmsNotFound]: SmsSendStatus.apiFail,
    [SmscStatus.Stop]: SmsSendStatus.apiFail,
    [SmscStatus.WaitingSent]: SmsSendStatus.inProgress,
    [SmscStatus.PassedOperator]: SmsSendStatus.inProgress,
    [SmscStatus.SuccessfullySent]: SmsSendStatus.completed,
    [SmscStatus.MessageRead]: SmsSendStatus.completed,
    [SmscStatus.Overdue]: SmsSendStatus.apiFail,
    [SmscStatus.ClickLink]: SmsSendStatus.completed,
    [SmscStatus.UnableDeliver]: SmsSendStatus.apiFail,
    [SmscStatus.IncorrectPhone]: SmsSendStatus.apiFail,
    [SmscStatus.Forbidden]: SmsSendStatus.apiFail,
    [SmscStatus.InsufficientFunds]: SmsSendStatus.apiFail,
    [SmscStatus.UnavailableNumber]: SmsSendStatus.apiFail,
};
