import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';

@Controller('ciudad')
export class CiudadController {
    constructor(
        @InjectRepository(CiudadEntity)
        private readonly repository: Repository<CiudadEntity>,
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
      async create(@Body() data: CiudadEntity) {
        const createdProductTypeExist = await getRepository(CiudadEntity)
          .createQueryBuilder('CiudadEntity')
          .where('CiudadEntity.name like :name', { name: `%${data.name}%` })
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
      update(@Body() data: CiudadEntity) {
        return this.repository.update(data.id, data);
      }
    
      @Delete('/:id')
      delete(@Param() id: number) {
        return this.repository.softDelete(id);
      }
}
