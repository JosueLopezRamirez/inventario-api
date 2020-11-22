import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
    constructor(
        @InjectRepository(Client)
        private readonly repository: Repository<Client>,
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
      async create(@Body() data: Client) {
        const createdProductTypeExist = await getRepository(Client)
          .createQueryBuilder('Client')
          .where('Client.name like :name', { name: `%${data.name}%` })
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
      update(@Body() data: Client) {
        return this.repository.update(data.id, data);
      }
    
      @Delete('/:id')
      delete(@Param() id: number) {
        return this.repository.softDelete(id);
      }
}
