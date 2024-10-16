import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class SmsConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'psw' })
    psw: string;

    @Column({ nullable: false, name: 'login' })
    login: string;

    @Column({ default: 'default', name: 'sender' })
    sender: string;

    @Column({ nullable: false, name: 'client_id' })
    clientId: number;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
