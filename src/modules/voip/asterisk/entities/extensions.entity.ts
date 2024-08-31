import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('extensions_context_exten_priority_key', ['context', 'exten', 'priority'], { unique: true })
@Index('extensions_pkey', ['id'], { unique: true })
@Entity('extensions', { schema: 'public' })
export class Extensions {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column()
    context: string;

    @Column()
    exten: string;

    @Column()
    priority: number;

    @Column()
    app: string;

    @Column()
    appdata: string;
}
