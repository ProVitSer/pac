import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { CallProcess, CallDirection } from '../interfaces/call-event-handler.enum';

@Entity()
export class CallEventHandler {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, name: 'call_id' })
    callId: string;

    @Column({ nullable: false, unique: true, name: 'call_history_id' })
    callHistoryId: string;

    @Column({
        type: 'enum',
        enum: CallDirection,
        name: 'call_type',
    })
    callDirection: CallDirection;

    @Column({
        type: 'enum',
        enum: CallProcess,
        default: CallProcess.callInProcess,
        name: 'call_process',
    })
    callProcess: CallProcess;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
