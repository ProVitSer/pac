import { Products } from '../../products/entities/products.entity';
import { Client } from '../../client/entities/client.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { LicensesInterface } from '../interfaces/licenses.interface';

@Entity()
export class Licenses implements LicensesInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client, (client) => client.licenses, { cascade: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ nullable: false, unique: true })
    license: string;

    @ManyToMany(() => Products, (product) => product.licenses, { cascade: true })
    @JoinTable()
    products: Products[];

    @Column({ nullable: false, name: 'expiration_date' })
    expirationDate: Date;

    @Column({ default: false, name: 'is_active' })
    isActive: boolean;

    @Column({ default: true, name: 'is_test' })
    isTest: boolean;

    @Column({ nullable: true })
    order?: Date;

    @Column({ nullable: true })
    activate?: Date;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
