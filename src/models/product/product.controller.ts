import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/')
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  getOne(@Param() id: number) {
    return this.service.getOne(id);
  }

  @Post('/')
  create(@Body() product: Product) {
    return this.service.create(product);
  }

  @Patch('/')
  update(@Body() product: Product) {
    return this.service.update(product);
  }

  @Patch('/:id')
  delete(@Param() id: number) {
    return this.service.delete(id);
  }
}
