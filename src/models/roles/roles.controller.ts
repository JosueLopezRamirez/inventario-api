import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Controller('roles')
export class RolesController {
    constructor(
        @InjectRepository(Roles)
        private readonly repository: Repository<Roles>,
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
      async create(@Body() data: Roles) {
        const createdProductTypeExist = await getRepository(Roles)
          .createQueryBuilder('Roles')
          .where('Roles.name like :name', { name: `%${data.name}%` })
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
      update(@Body() data: Roles) {
        return this.repository.update(data.id, data);
      }
    
      @Delete('/:id')
      delete(@Param() id: number) {
        return this.repository.softDelete(id);
      }
}
