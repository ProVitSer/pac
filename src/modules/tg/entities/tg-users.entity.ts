import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, Column } from 'typeorm';
import { TgConfig } from './tg-config.entity';

@Entity()
export class TgUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'user_name' })
    userName: string;

    @Column({ nullable: false })
    extension: string;

    @ManyToMany(() => TgConfig, (tgConfig) => tgConfig.tgUsers, { onDelete: 'CASCADE' })
    tgConfig: TgConfig[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
