import { Permission } from '@app/common/interfaces/enums';
import { AvatarType, NotificationType } from './interfaces/users-notifications.enum';

export const USER_PERMISSIONS = [Permission.Read];
export const ADMIN_PERMISSIONS = [Permission.Read, Permission.Create, Permission.Update, Permission.Delete];
export const FORGOT_PASSWORD_MESSAGE = 'Письмо для сброса пароля успешно отправлено';
export const RESET_PASSWORD_MESSAGE = 'Пароль пользователя успешно изменен';

export const INIT_WELCOME_NOTIFICATION = {
    type: NotificationType.alert,
    avatarType: AvatarType.name,
    smallTitle: 'OnVoip',
    fullTitle: 'Мы рады вас видеть! Вот несколько ключевых функций для быстрого старта:',
    smallText: 'Добро пожаловать! Готовы начать работу? Мы здесь, чтобы помочь вам.',
    html: `<div class='col-xl-6 col-lg-6 col-md-12'><div class='card overflow-hidden'>
<div class='card-content'>
<img class='card-img-top img-fluid' src='assets/img/photos/06.jpg' alt='Card image cap'>
<div class='card-body'>
<h4 class='card-title'>FAQ</h4>
<p class='card-text'></p>
<button type='button' class='btn btn-warning'>Перейти</button>
</div>
</div>
</div>
</div>`,
    author: {
        firstName: 'OnVoip',
        lastName: 'Platform',
    },
};
