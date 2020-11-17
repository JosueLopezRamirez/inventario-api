import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  getAll() {
    return this.repository.find();
  }

  getOne(id: number) {
    return this.repository.findOne(id, { withDeleted: true, relations: ["type"] });
  }

  async create(product: Product) {
    const createdProductExist = await getRepository(Product)
      .createQueryBuilder('product')
      .where('product.name like :name', { name: `%${product.name}%` })
      .getOne();

    if (createdProductExist) {
      return {
        status: 422,
        message: 'The product already exist in the database',
      };
    }

    return this.repository.save(product);
  }

  update(product: Product) {
    return this.repository.update(product.id, product);
  }

  delete(id: number) {
    return this.repository.softDelete(id);
  }
}
