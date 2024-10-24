import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { TgUsers } from './tg-users.entity';

@Entity()
export class TgConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, name: 'name' })
    name: string;

    @Column({ unique: true, nullable: false, name: 'token' })
    token: string;

    @Column({ unique: true, nullable: false, name: 'chat_id' })
    chatId: string;

    @Column({ nullable: true, name: 'client_id' })
    clientId: number;

    @ManyToMany(() => TgUsers, (tgUsers) => tgUsers.tgConfig, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    tgUsers: TgUsers[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
