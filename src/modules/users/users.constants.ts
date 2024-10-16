import { Permission } from '@app/common/interfaces/enums';

export const USER_PERMISSIONS = [Permission.Read];
export const ADMIN_PERMISSIONS = [Permission.Read, Permission.Create, Permission.Update, Permission.Delete];
