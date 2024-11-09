import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

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

    @Column({ nullable: true, name: 'client_id' })
    clientId: number;

    @Column({ nullable: true, default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
