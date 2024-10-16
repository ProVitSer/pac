import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Index('extensions_context_exten_priority_key', ['context', 'exten', 'priority'], { unique: true })
@Index('extensions_pkey', ['id'], { unique: true })
@Entity('extensions', { schema: 'public' })
export class Extensions {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ nullable: false })
    context: string;

    @Column({ nullable: false })
    exten: string;

    @Column({ nullable: false })
    priority: number;

    @Column({ nullable: false })
    app: string;

    @Column({ nullable: false })
    appdata: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
