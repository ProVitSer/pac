import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class ExtensionAnalitics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, name: 'extension' })
    extension: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ name: 'inbound_answered_count' })
    inboundAnsweredCount: number;

    @Column({ name: 'inbound_unanswered_count' })
    inboundUnansweredCount: number;

    @Column({ name: 'outbound_call_count' })
    outboundCallCount: number;

    @Column({ name: 'call_talking_dur' })
    callTalkingDur: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
