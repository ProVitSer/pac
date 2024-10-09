import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class CrmUsers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, name: 'pbx_extension' })
    pbxExtension: number;

    @Column({ nullable: false, unique: true, name: 'crm_user_id' })
    crmUserId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
