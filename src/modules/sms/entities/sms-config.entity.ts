import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { DEFAULTMISSED_CALL_SMS_TEXT } from '../sms.constants';

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

    @Column({ default: DEFAULTMISSED_CALL_SMS_TEXT, name: 'sms_text' })
    smsText: string;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
