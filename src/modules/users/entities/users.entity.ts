import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UsersInterface } from '../interfaces/users.interface';
import { Permission, Role } from '../../../common/interfaces/enums';

@Entity()
export class Users implements UsersInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phone_number?: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: true })
    latest_activity: Date;

    @Column({ nullable: false })
    registered_date: Date;

    @Column({
        type: 'enum',
        enum: Permission,
        array: true,
        default: [Permission.Read],
    })
    permissions: Permission[];

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.User],
    })
    roles: Role[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
