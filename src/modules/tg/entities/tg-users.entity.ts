import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, Column } from 'typeorm';
import { TgConfig } from './tg-config.entity';

@Entity()
export class TgUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: null, name: 'name' })
    name: string;

    @Column({ nullable: false, name: 'tg_user_name', unique: true })
    tgUserName: string;

    @Column({ nullable: false, unique: true })
    extension: string;

    @ManyToMany(() => TgConfig, (tgConfig) => tgConfig.tgUsers, { onDelete: 'CASCADE' })
    tgConfig: TgConfig[];

    @Column({ nullable: true, default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
