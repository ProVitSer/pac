import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { CallDirection } from '../interfaces/call-analytics.enum';

@Entity()
export class PbxCallStatistics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'call_id' })
    callId: number;

    @Column({
        type: 'enum',
        enum: CallDirection,
        name: 'call_type',
    })
    callDirection: CallDirection;

    @Column({ nullable: true, name: 'answered' })
    answered: boolean;

    @Column({ default: '', nullable: true, name: 'destination_caller_id' })
    destinationCallerId: string;

    @Column({ default: '', nullable: true, name: 'destination_display_name' })
    destinationDisplayName: string;

    @Column({ default: '', nullable: true, name: 'destination_dn' })
    destinationDn: string;

    @Column({ default: '', nullable: true, name: 'reason' })
    reason: string;

    @Column({ default: '', nullable: true, name: 'ringing_duration' })
    ringingDuration: string;

    @Column({ default: '', nullable: true, name: 'source_caller_id' })
    sourceCallerId: string;

    @Column({ default: '', nullable: true, name: 'source_display_name' })
    sourceDisplayName: string;

    @Column({ default: '', nullable: true, name: 'source_dn' })
    sourceDn: string;

    @Column({ default: '', nullable: true, name: 'start_time' })
    startTime: string;

    @Column({ default: '', nullable: true, name: 'talking_duration' })
    talkingDuration: string;

    @Column({ default: '', nullable: true, name: 'recording_url' })
    recordingUrl: string;

    @Column({ unique: true, nullable: true, name: 'segment_id' })
    segmentId: number;

    @Column({ default: '', nullable: true, name: 'country' })
    country?: string;

    @Column({ default: '', nullable: true, name: 'region' })
    region?: string;

    @Column({ default: '', nullable: true, name: 'city' })
    city?: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
