import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { ProviderModule } from './provider/provider.module';
import { ClientModule } from './client/client.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ProductModule, ProductTypeModule, CiudadModule, DocumentTypeModule, ProviderModule, ClientModule, UsersModule, RolesModule]
})
export class ModelsModule {}
