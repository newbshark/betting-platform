import { Injectable } from '@nestjs/common';

import { CreateBetDto } from './create-bet.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BetsService {
  constructor(private readonly usersService: UsersService) {}

  async createBet(createBetDto: CreateBetDto) {
    await this.usersService.getUserById(String(createBetDto.userId));

    return {
      id: 1,
      ...createBetDto,
      status: 'PENDING',
    };
  }
}
