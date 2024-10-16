import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class TgMessages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false, name: 'message_id' })
    messageId: string;

    @Column({ nullable: false, name: 'message' })
    message: string;

    @Column({ nullable: true, name: 'tg_config_id' })
    tgConfigId: number;

    @Column({ nullable: true, name: 'tg_user_id' })
    tgUserId: number;

    @Column({ nullable: false, name: 'client_id' })
    clientId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
