import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService){}

    @Get("/")
    getAll() {
        return this.service.getAll();
    }

    @Post("/")
    create(@Body() product: Product){
        return this.service.create(product);
    }
}
