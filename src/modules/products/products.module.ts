import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
