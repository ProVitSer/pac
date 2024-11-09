import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UsersInterface } from '../interfaces/users.interface';
import { Permission, Role } from '../../../common/interfaces/enums';
import { Client } from '../../../modules/client/entities/client.entity';
import { ADMIN_PERMISSIONS } from '../users.constants';

@Entity()
export class Users implements UsersInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, name: 'phone_number' })
    phoneNumber?: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ nullable: true, name: 'latest_activity' })
    latestActivity: Date;

    @Column({ nullable: false, name: 'registered_date' })
    registeredDate: Date;

    @Column({
        type: 'enum',
        enum: Permission,
        array: true,
        default: ADMIN_PERMISSIONS,
    })
    permissions: Permission[];

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.User],
    })
    roles: Role[];

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ nullable: true, name: 'validation_token' })
    validationToken: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
