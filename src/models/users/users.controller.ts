import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
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
  async create(@Body() data: Users) {
    const createdProductTypeExist = await getRepository(Users)
      .createQueryBuilder('Users')
      .where('Users.username like :username', {
        username: `%${data.username}%`,
      })
      .getOne();

    if (createdProductTypeExist) {
      return {
        status: 422,
        message: 'La ciudad ya existe en la base de datos',
      };
    }

    return this.repository.save(data);
  }

  @Post('/login')
  async login(@Body() data: Users) {
    const createdProductTypeExist = await this.repository.findOneOrFail({
      where: { username: data.username },
      relations: ['roles']
    });

    if (createdProductTypeExist) {
      return {
        status: 200,
        message: 'Usuario logeado exitosamente',
        data: {
          login: true,
          userData: createdProductTypeExist,
        },
      };
    }

    return {
      status: 200,
      message: 'username or password incorrect',
      data: {
        login: false,
      },
    };
  }

  @Patch('/')
  update(@Body() data: Users) {
    return this.repository.update(data.id, data);
  }

  @Delete('/:id')
  delete(@Param() id: number) {
    return this.repository.softDelete(id);
  }
}
