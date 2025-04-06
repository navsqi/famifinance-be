import { Account } from '@common/database/entities';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly dataSource: DataSource) {}

  async create(payload: CreateAccountDto) {
    const { manager } = this.dataSource;

    const account = (await manager.save(Account, payload)) as Account;

    return {
      result: {
        account,
      },
    };
  }

  async findAll() {
    const { manager } = this.dataSource;

    const accounts = await manager.find(Account);

    return {
      result: {
        accounts,
      },
    };
  }

  async update(id: string, payload: UpdateAccountDto) {
    const { manager } = this.dataSource;

    const account = await manager.update(
      Account,
      {
        id,
      },
      payload,
    );

    return {
      result: {
        account,
      },
    };
  }

  async remove(id: string) {
    const { manager } = this.dataSource;

    const account = await manager.delete(Account, id);

    return {
      result: {
        account,
      },
    };
  }
}
