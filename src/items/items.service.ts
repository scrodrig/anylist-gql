import { CreateItemInput, UpdateItemInput } from './dto/inputs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    //TODO: pagination, filtering, sorting
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    //TODO: add soft delete
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    await this.itemsRepository.remove(item);

    return { ...item, id };
  }
}
