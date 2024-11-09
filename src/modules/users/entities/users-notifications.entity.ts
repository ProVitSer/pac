import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NotificationAuthor } from '../interfaces/user-notifications.interface';
import { AvatarType, NotificationType } from '../interfaces/users-notifications.enum';

@Entity()
export class UsersNotifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: NotificationType, nullable: false, name: 'type' })
    type: NotificationType;

    @Column({ type: 'enum', enum: AvatarType, nullable: false, name: 'avatar_type' })
    avatarType: AvatarType;

    @Column({ nullable: true, name: 'icon' })
    icon?: string;

    @Column({ nullable: true, name: 'img' })
    img?: string;

    @Column({ nullable: true, name: 'small_title' })
    smallTitle: string;

    @Column({ nullable: false, name: 'full_title' })
    fullTitle: string;

    @Column({ nullable: false, name: 'small_text' })
    smallText: string;

    @Column({ nullable: false, name: 'html' })
    html: string;

    @Column({ nullable: true, name: 'link' })
    link?: string;

    @Column({ default: false, name: 'is_read' })
    isRead: boolean;

    @Column('json', { nullable: true, name: 'author' })
    author: NotificationAuthor;

    @Column({ default: false, name: 'deleted' })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
