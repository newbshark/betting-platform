import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private static readonly TABLE_NAME = 'users';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  findAll(): Promise<User[]> {
    return this.knex<User>('users').select('*');
  }

  findById(id: number): Promise<User | undefined> {
    return this.knex<User>(UsersRepository.TABLE_NAME).where({ id }).first();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [user] = await this.knex<User>(UsersRepository.TABLE_NAME)
      .insert({
        name: createUserDto.name,
        email: createUserDto.email,
        phoneNumber: createUserDto.phoneNumber,
      })
      .returning('*');

    return user;
  }
}
