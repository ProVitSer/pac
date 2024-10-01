import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { CallProcess, CallDirection } from '../interfaces/call-event-handler.enum';
import { FullCallInfo } from '../interfaces/call-event-handler.interface';

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

    @Column('json', { nullable: true, name: 'original_full_call_info' })
    originalFullCallInfo: string[][];

    @Column('json', { nullable: true, name: 'full_call_info' })
    fullCallInfo: FullCallInfo[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
