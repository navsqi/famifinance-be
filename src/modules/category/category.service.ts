import { Category } from '@common/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly dataSource: DataSource) {}

  async create(payload: CreateCategoryDto) {
    const { manager } = this.dataSource;

    const category = (await manager.save(Category, payload)) as Category;

    return {
      result: {
        category,
      },
    };
  }

  async findAll() {
    const { manager } = this.dataSource;

    const categories = await manager.find(Category);

    return {
      result: {
        categories,
      },
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const { manager } = this.dataSource;

    const category = await manager.update(
      Category,
      {
        id,
      },
      payload,
    );

    return {
      result: {
        category,
      },
    };
  }

  async remove(id: string) {
    const { manager } = this.dataSource;

    const category = await manager.delete(Category, id);

    return {
      result: {
        category,
      },
    };
  }
}
