import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { SmsSendStatus } from '../interfaces/sms.enum';

@Entity()
export class Sms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    smsId: string;

    @Column({ nullable: false })
    number: string;

    @Column({ nullable: false, name: 'sms_text' })
    smsText: string;

    @Column({ nullable: true, name: 'sender' })
    sender: string;

    @Column({ nullable: false, name: 'client_id' })
    clientId: number;

    @Column({ nullable: true, type: 'enum', enum: SmsSendStatus, name: 'sms_send_status' })
    smsSendStatus: SmsSendStatus;

    @Column({ nullable: true, name: 'sms_send_result' })
    smsSendResult: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
