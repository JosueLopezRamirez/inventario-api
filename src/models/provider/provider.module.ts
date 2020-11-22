import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './provider.controller';
import { Provider } from './provider.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Provider])],
  controllers: [ProviderController]
})
export class ProviderModule {}
