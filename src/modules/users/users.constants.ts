import { Permission } from '@app/common/interfaces/enums';

export const USER_PERMISSIONS = [Permission.Read];
export const ADMIN_PERMISSIONS = [Permission.Read, Permission.Create, Permission.Update, Permission.Delete];
export const FORGOT_PASSWORD_MESSAGE = 'Письмо для сброса пароля успешно отправлено';
export const RESET_PASSWORD_MESSAGE = 'Пароль пользователя успешно изменен';
