import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ProductType } from './product-type.entity';

@Controller('product-type')
export class ProductTypeController {
  constructor(
    @InjectRepository(ProductType)
    private readonly repository: Repository<ProductType>,
  ) {}

  @Get('/')
  getAll() {
    return this.repository.find();
  }

  @Get('/:id')
  getOne(@Param() id: number) {
    return this.repository.findOne(id, { withDeleted: true });
  }

  @Post('/')
  async create(@Body() data: ProductType) {
    const createdProductTypeExist = await getRepository(ProductType)
      .createQueryBuilder('ProductType')
      .where('ProductType.name like :name', { name: `%${data.name}%` })
      .getOne();

    if (createdProductTypeExist) {
      return {
        status: 422,
        message: 'The product already exist in the database',
      };
    }

    return this.repository.save(data);
  }

  @Patch('/')
  update(@Body() data: ProductType) {
    return this.repository.update(data.id, data);
  }

  @Patch('/:id')
  delete(@Param() id: number) {
    return this.repository.softDelete(id);
  }
}
