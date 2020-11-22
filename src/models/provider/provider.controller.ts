import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Provider } from './provider.entity';

@Controller('provider')
export class ProviderController {
    constructor(
        @InjectRepository(Provider)
        private readonly repository: Repository<Provider>,
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
      async create(@Body() data: Provider) {
        const createdProductTypeExist = await getRepository(Provider)
          .createQueryBuilder('Provider')
          .where('Provider.name like :name', { name: `%${data.name}%` })
          .getOne();
    
        if (createdProductTypeExist) {
          return {
            status: 422,
            message: 'La ciudad ya existe en la base de datos',
          };
        }
    
        return this.repository.save(data);
      }
    
      @Patch('/')
      update(@Body() data: Provider) {
        return this.repository.update(data.id, data);
      }
    
      @Delete('/:id')
      delete(@Param() id: number) {
        return this.repository.softDelete(id);
      }
}
