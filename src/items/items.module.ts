import { Item } from './entities/item.entity';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
