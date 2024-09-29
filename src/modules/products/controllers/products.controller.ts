import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductInterface } from '../interfaces/products.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductType } from '../interfaces/products.enum';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    async getByType(@Query('type') productType: ProductType): Promise<ProductInterface[]> {
        if (productType) return this.productService.getProductByType(productType);
        return this.productService.getProducts();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

    @Post()
    async createProduct(@Body() product: CreateProductDto): Promise<ProductInterface> {
        return this.productService.createProduct(product);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
}
