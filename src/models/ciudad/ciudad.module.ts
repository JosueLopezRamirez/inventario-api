import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadController } from './ciudad.controller';
import { CiudadEntity } from './ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity])],
  controllers: [CiudadController]
})
export class CiudadModule {}
