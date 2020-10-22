import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)
    private readonly repository: Repository<Product>,
    ){}

    getAll() {
        return this.repository.find();
    }

    create(product: Product){
        return this.repository.save(product);
    }
}
