import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
  imports: [ProductModule, ProductTypeModule]
})
export class ModelsModule {}
