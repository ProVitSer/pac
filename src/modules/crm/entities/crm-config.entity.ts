import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class CrmConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'client_id' })
    clientId: number;

    @Column({ nullable: false, name: 'admin_id' })
    adminId: number;

    @Column({ nullable: false, name: 'user_task_id' })
    userTaskId: number;

    @Column({ nullable: false, name: 'task_group' })
    taskGroup: number;

    @Column({ nullable: true, name: 'daedline_min' })
    daedlineMin?: number;

    @Column({ nullable: false, name: 'domain' })
    domain: string;

    @Column({ nullable: false, name: 'hash' })
    hash: string;

    @Column({ nullable: false, name: 'token' })
    token: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
