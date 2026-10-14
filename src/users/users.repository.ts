import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private static readonly TABLE_NAME = 'users';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  findAll(): Promise<User[]> {
    return this.knex<User>(UsersRepository.TABLE_NAME).select('*');
  }

  findById(id: number): Promise<User | undefined> {
    return this.knex<User>(UsersRepository.TABLE_NAME).where({ id }).first();
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.knex<User>(UsersRepository.TABLE_NAME).where({ email }).first();
  }

  async create(data: {
    name: string;
    email: string;
    phoneNumber: string;
    password_hash: string;
    role?: 'user' | 'admin';
  }): Promise<User> {
    const [user] = await this.knex<User>(UsersRepository.TABLE_NAME)
      .insert({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password_hash: data.password_hash,
        role: data.role ?? 'user',
      })
      .returning('*');
    return user;
  }
}