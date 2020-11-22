import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { DocumentType } from './document-type.entity';

@Controller('document-type')
export class DocumentTypeController {
  constructor(
    @InjectRepository(DocumentType)
    private readonly repository: Repository<DocumentType>,
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
  async create(@Body() data: DocumentType) {
    const createdProductTypeExist = await getRepository(DocumentType)
      .createQueryBuilder('DocumentType')
      .where('DocumentType.name like :name', { name: `%${data.name}%` })
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
  update(@Body() data: DocumentType) {
    return this.repository.update(data.id, data);
  }

  @Delete('/:id')
  delete(@Param() id: number) {
    return this.repository.softDelete(id);
  }
}
