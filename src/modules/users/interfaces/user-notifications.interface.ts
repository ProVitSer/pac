import { NotificationType, AvatarType } from './users-notifications.enum';

export class NotificationAuthor {
    firstName: string;
    lastName: string;
}

export interface AddNotificationData {
    type?: NotificationType;
    avatarType?: AvatarType;
    icon?: string;
    img?: string;
    smallTitle: string;
    fullTitle: string;
    smallText: string;
    html: string;
    link?: string;
    author?: NotificationAuthor;
}
export interface GetClientNotificationsData {
    limit: string;
}

export interface Notification {
    id: number;
    type: NotificationType;
    avatarType: AvatarType;
    icon?: string;
    img?: string;
    smallTitle: string;
    fullTitle: string;
    smallText: string;
    html: string;
    link?: string;
    isRead: boolean;
    author: NotificationAuthor;
    createdAt: Date;
}

export interface GetNotificationListData {
    offset?: number;
    limit: number;
}

export interface NotificationCountList {
    notifications: Notification[];
    count: number;
}
