import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class CallAnalytics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'call_id' })
    callId: number;

    @Column({ nullable: false, name: 'client_id' })
    clientId: number;

    @Column({
        type: 'enum',
        enum: CallDirection,
        name: 'call_type',
    })
    callDirection: CallDirection;

    @Column({ default: '', nullable: true, name: 'client_company' })
    clientCompany?: string;

    @Column({ default: '', nullable: true, name: 'country' })
    country?: string;

    @Column({ default: '', nullable: true, name: 'region' })
    region?: string;

    @Column({ default: '', nullable: true, name: 'city' })
    city?: string;

    @Column({ default: '', nullable: true, name: 'src_display_name' })
    srcDisplayName: string;

    @Column({ default: '', nullable: true, name: 'src_caller_number' })
    srcCallerNumber: string;

    @Column({ default: '', nullable: true, name: 'src_dn' })
    srcDn: string;

    @Column({ default: '', nullable: true, name: 'dst_extended_display_name' })
    dstExtendedDisplayName: string;

    @Column({ default: '', nullable: true, name: 'dst_display_name' })
    dstDisplayName: string;

    @Column({ default: '', nullable: true, name: 'dst_dn' })
    dstDn: string;

    @Column({ default: '', nullable: true, name: 'dst_caller_number' })
    dstCallerNumber: string;

    @Column({ default: 0, nullable: true, name: 'call_time' })
    callTime: number;

    @Column({ default: '', nullable: true, name: 'dst_recording_url' })
    dstRecordingUrl: string;

    @Column({ default: '', nullable: true, name: 'operator_name' })
    operatorName: string;

    @Column({ default: '', nullable: true, name: 'start_time' })
    startTime: string;

    @Column({ default: '', nullable: true, name: 'end_time' })
    endTime: string;

    @Column({ nullable: true, name: 'call_answered' })
    callAnswered: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
