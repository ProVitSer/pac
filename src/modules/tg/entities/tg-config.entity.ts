import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

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

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
