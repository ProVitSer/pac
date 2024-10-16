import { Licenses } from '../../licenses/entities/licenses.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany } from 'typeorm';
import { ProductType } from '../interfaces/products.enum';
import { ProductInterface } from '../interfaces/products.interface';

@Entity()
export class Products implements ProductInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ProductType,
        nullable: false,
        default: ProductType.analitic,
        unique: true,
        name: 'product_type',
    })
    productType: ProductType;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Licenses, (license) => license.products)
    licenses: Licenses[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
