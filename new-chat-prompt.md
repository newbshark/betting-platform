========== PROJECT DUMP ==========
Generated: Sun Sep 27 16:30:49 MSK 2026
==================================

========== PROJECT STRUCTURE ==========
src
├── accounts
│   ├── account.entity.ts
│   ├── accounts.controller.ts
│   ├── accounts.module.ts
│   ├── accounts.repository.ts
│   ├── accounts.service.ts
│   ├── dto
│   │   ├── account-operation-response.dto.ts
│   │   ├── create-account.dto.ts
│   │   ├── credit-account.dto.ts
│   │   └── debit-account.dto.ts
│   └── transactions
│       ├── accounts-transactions.service.ts
│       └── dto
│           └── account-operation-response.dto.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── bets
│   ├── bet.entity.ts
│   ├── bets.controller.ts
│   ├── bets.module.ts
│   ├── bets.repository.ts
│   ├── bets.service.ts
│   └── dto
│       ├── bet-response.dto.ts
│       └── create-bet.dto.ts
├── common
│   ├── config
│   │   ├── config.module.ts
│   │   └── config.service.ts
│   ├── email-service
│   │   └── EmailService.ts
│   ├── logger
│   │   ├── logger.module.ts
│   │   └── logger.service.ts
│   └── money
│       ├── decimal.config.ts 
│       ├── money.ts
│       └── odds.ts
├── database
│   ├── database.constants.ts
│   ├── database.module.ts
│   └── migrations
│       ├── 20260829110806_create_users_table.ts
│       ├── 20260829120000_create_accounts_table.ts
│       ├── 20260906182130_create_transactions_table.ts
│       ├── 20260922174641_create_events_table.ts
│       ├── 20260922175445_create_outcomes_table.ts
│       └── 20260922193048_create_bets_table.ts
├── events
│   ├── dto
│   │   └── create-event.dto.ts
│   ├── event.entity.ts
│   ├── events.controller.ts
│   ├── events.module.ts
│   ├── events.repository.ts
│   └── events.service.ts
├── main.ts
├── outcomes
│   ├── dto
│   │   └── create-outcome.dto.ts
│   ├── outcome.entity.ts
│   ├── outcomes.controller.ts
│   ├── outcomes.module.ts
│   ├── outcomes.repository.ts
│   └── outcomes.service.ts
├── transactions
│   ├── transaction.entity.ts
│   ├── transactions.module.ts
│   └── transactions.repository.ts
└── users
    ├── dto
    │   └── create-user.dto.ts
    ├── user.entity.ts
    ├── users.controller.ts
    ├── users.module.ts
    ├── users.repository.ts
    └── users.service.ts

========== ROOT CONFIG FILES ==========

----- package.json -----
{
  "name": "betting-platform",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "dev": "nest start --watch",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "migrate:make": "knex migrate:make -x ts",
    "migrate:latest": "knex migrate:latest",
    "migrate:rollback": "knex migrate:rollback",
    "dump": "./dump.sh"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^12.0.0",
    "@nestjs/core": "^11.0.1",
    "@nestjs/platform-express": "^11.0.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.15.1",
    "decimal.js": "^10.6.0",
    "dotenv": "^17.4.2",
    "knex": "^3.3.0",
    "pg": "^8.23.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "winston": "^3.19.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/express": "^5.0.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^24.0.0",
    "@types/pg": "^8.23.1",
    "@types/supertest": "^7.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^17.0.0",
    "jest": "^30.0.0",
    "prettier": "^3.4.2",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


----- tsconfig.json -----
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "incremental": true,
    "tsBuildInfoFile": "./dist/tsconfig.build.tsbuildinfo",
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "knexfile.ts",
    "dist"
  ]
}

----- knexfile.ts -----
import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: Number(process.env.DATABASE_PORT ?? 5432),
    user: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    database: process.env.DATABASE_NAME ?? 'betting_platform',
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
};

export default config;


----- .env.example -----
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=betting_platform


----- README.md -----
# Betting Platform

Backend для букмекерской платформы на NestJS.

Проект находится на ранней стадии разработки. На текущем этапе реализована базовая архитектура приложения, работа с пользователями и создание ставок.

## Tech Stack

- Node.js 20
- NestJS 11
- TypeScript
- pnpm
- class-validator
- class-transformer
- Jest

## Architecture

Проект построен по модульному принципу NestJS.

```text
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── create-user.dto.ts
│
├── bets/
│   ├── bets.controller.ts
│   ├── bets.service.ts
│   ├── bets.module.ts
│   └── create-bet.dto.ts
│
├── app.module.ts
└── main.ts

========== SRC FILES ==========

----- src/accounts/account.entity.ts -----
export interface Account {
  id: number;
  user_id: number;
  balance: string;
  created_at: Date;
  updated_at: Date;
}


----- src/accounts/accounts.controller.ts -----
// src/accounts/accounts.controller.ts
import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreditAccountDto } from './dto/credit-account.dto';
import { DebitAccountDto } from './dto/debit-account.dto';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto.userId);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId', ParseIntPipe) userId: number) {
    return this.accountsService.getBalance(userId);
  }

  @Post(':accountId/credit')
  async credit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: CreditAccountDto,
  ): Promise<AccountOperationResponseDto> {
    return this.accountsService.credit(accountId, dto.amount);
  }

  @Post(':accountId/debit')
  async debit(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() dto: DebitAccountDto,
  ): Promise<AccountOperationResponseDto> {
    return this.accountsService.debit(accountId, dto.amount);
  }
}

----- src/accounts/accounts.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../users/users.module';
import { EmailService } from '../common/email-service/EmailService';


@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AccountsService, AccountsRepository, EmailService],
  controllers: [AccountsController],
  exports: [AccountsService, AccountsRepository], 
})
export class AccountsModule {}

----- src/accounts/accounts.repository.ts -----
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Account } from './account.entity';
import { Transaction } from '../transactions/transaction.entity'; 
import { Money } from '../common/money/money';

@Injectable()
export class AccountsRepository {
  private static readonly TABLE_NAME = 'accounts';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) { }

  async findByUserId(userId: number): Promise<Account[] | undefined> {
    return this.knex<Account>(AccountsRepository.TABLE_NAME).where({
      user_id: userId,
    });
  }

  async findById(id: number): Promise<Account | undefined> {
    return this.knex<Account>(AccountsRepository.TABLE_NAME)
      .where({ id })
      .first();
  }

  async findPrimaryByUserId(userId: number): Promise<Account | undefined> {
  return this.knex<Account>(AccountsRepository.TABLE_NAME)
    .where({ user_id: userId })
    .first();
}

  async create(userId: number): Promise<Account> {
    const [account] = await this.knex<Account>(AccountsRepository.TABLE_NAME)
      .insert({
        user_id: userId,
        balance: '0.00',
      })
      .returning('*');
    return account;
  }

  async getBalance(accountId: number): Promise<Money> {
    const account = await this.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return new Money(account.balance);
  }

  async lockForUpdate(accountId: number, trx: Knex.Transaction): Promise<Account> {
    const account = await trx<Account>(AccountsRepository.TABLE_NAME)
      .where({ id: accountId })
      .forUpdate()
      .first();

    if (!account) {
      throw new Error(`Account with id ${accountId} not found`);
    }

    return account;
  }

  async updateBalance(
    accountId: number,
    newBalance: Money,
    trx: Knex.Transaction,
  ): Promise<Account> {
    const [updated] = await trx<Account>(AccountsRepository.TABLE_NAME)
      .where({ id: accountId })
      .update({
        balance: newBalance.toString(),
        updated_at: new Date(),
      })
      .returning('*');

    return updated;
  }

  async creditWithTransaction(
  accountId: number,
  amount: Money,
): Promise<{ account: Account; transaction: Transaction }> {
  // 1. Открываем транзакцию
  const trx = await this.knex.transaction();

  try {
    // 2. Блокируем счёт (FOR UPDATE)
    const account = await this.lockForUpdate(accountId, trx);

    // 3. Вычисляем новый баланс
    const currentBalance = new Money(account.balance);
    const newBalance = currentBalance.add(amount);

    // 4. Обновляем баланс
    const updatedAccount = await this.updateBalance(accountId, newBalance, trx);

    // 5. Создаём запись в transactions
    const [transaction] = await trx<Transaction>('transactions')
      .insert({
        account_id: accountId,
        type: 'CREDIT',
        amount: amount.toString(),
        balance_after: newBalance.toString(),
        description: `Credit ${amount.toString()} to account ${accountId}`,
      })
      .returning('*');

    // 6. Коммитим
    await trx.commit();

    return { account: updatedAccount, transaction };
  } catch (error) {
    // 7. При ошибке откатываем
    await trx.rollback();
    throw error;
  }
}

async debitWithTransaction(
  accountId: number,
  amount: Money,
): Promise<{ account: Account; transaction: Transaction }> {
  const trx = await this.knex.transaction();

  try {
    const account = await this.lockForUpdate(accountId, trx);

    const currentBalance = new Money(account.balance);

    // Проверяем баланс
    if (currentBalance.compareTo(amount) < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    const newBalance = currentBalance.subtract(amount);

    const updatedAccount = await this.updateBalance(accountId, newBalance, trx);

    const [transaction] = await trx<Transaction>('transactions')
      .insert({
        account_id: accountId,
        type: 'DEBIT',
        amount: amount.toString(),
        balance_after: newBalance.toString(),
        description: `Debit ${amount.toString()} from account ${accountId}`,
      })
      .returning('*');

    await trx.commit();

    return { account: updatedAccount, transaction };
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}
}


----- src/accounts/accounts.service.ts -----
import {
  BadRequestException,
  Injectable, NotFoundException
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../common/email-service/EmailService';
import { AppLoggerService } from '../common/logger/logger.service';
import { Inject } from '@nestjs/common';
import { Money } from '../common/money/money';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly appLoggerService: AppLoggerService,
  ) { }

  async createAccount(userId: number): Promise<Account> {
    this.appLoggerService.log(
      'Starting account creation process for userId: ' + userId,
    );
    const existingsAccounts =
      await this.accountsRepository.findByUserId(userId);

    if (existingsAccounts && existingsAccounts?.length >= 3) {
      throw new BadRequestException(
        'Maximum number of accounts reached for this user',
      );
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const email = user.email;

    const account = await this.accountsRepository.create(userId);

    this.emailService.sendEmail(
      email,
      'New Account Created',
      `Your new account has been created successfully. Account ID: ${account.id}`,
    );

    this.appLoggerService.log(
      'Finished account creation process for userId: ' + userId,
    );
    return account;
  }

  async getPrimaryAccountId(userId: number): Promise<number> {
  const account = await this.accountsRepository.findPrimaryByUserId(userId);
  if (!account) {
    throw new NotFoundException(`No account found for user ${userId}`);
  }
  return account.id;
}



  async getBalance(userId: number): Promise<Money> {

    const accounts = await this.accountsRepository.findByUserId(userId);
    if (!accounts || accounts.length === 0) {
      throw new NotFoundException(`No accounts found for user ${userId}`);
    }
    return new Money(accounts[0].balance);
  }


  async credit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } = await this.accountsRepository.creditWithTransaction(
      accountId,
      moneyAmount,
    );

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }

  async debit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } = await this.accountsRepository.debitWithTransaction(
      accountId,
      moneyAmount,
    );

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }
}

----- src/accounts/dto/account-operation-response.dto.ts -----

export class TransactionResponseDto {
  id!: number;
  type!: 'CREDIT' | 'DEBIT';
  amount!: string;
  balanceAfter!: string;
}

export class AccountOperationResponseDto {
  accountId!: number;
  newBalance!: string;
  transaction!: TransactionResponseDto;
}

----- src/accounts/dto/create-account.dto.ts -----
import { IsInt, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsInt()
  @IsPositive()
  userId!: number;
}

----- src/accounts/dto/credit-account.dto.ts -----
import { IsNumber,IsPositive } from "class-validator";

export class CreditAccountDto {
    @IsNumber()
    @IsPositive()
    amount!: number;
}

----- src/accounts/dto/debit-account.dto.ts -----
import { IsNumber, IsPositive } from 'class-validator';

export class DebitAccountDto {
  @IsNumber()
  @IsPositive()
  amount!: number;
}

----- src/accounts/transactions/accounts-transactions.service.ts -----
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountsRepository } from '../accounts.repository';
import { Account } from '../account.entity';
import { Money } from '../../common/money/money';
import { AccountOperationResponseDto } from './dto/account-operation-response.dto';

@Injectable()
export class AccountsTransactionsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async credit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } =
      await this.accountsRepository.creditWithTransaction(accountId, moneyAmount);

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }

  async debit(
    accountId: number,
    amount: number,
  ): Promise<AccountOperationResponseDto> {
    const moneyAmount = new Money(amount);
    const { account, transaction } =
      await this.accountsRepository.debitWithTransaction(accountId, moneyAmount);

    return {
      accountId: account.id,
      newBalance: account.balance,
      transaction: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        balanceAfter: transaction.balance_after,
      },
    };
  }
}

----- src/accounts/transactions/dto/account-operation-response.dto.ts -----
export class TransactionResponseDto {
  id!: number;
  type!: 'CREDIT' | 'DEBIT';
  amount!: string;
  balanceAfter!: string;
}

export class AccountOperationResponseDto {
  accountId!: number;
  newBalance!: string;
  transaction!: TransactionResponseDto;
}

----- src/app.controller.ts -----
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


----- src/app.module.ts -----
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BetsModule } from './bets/bets.module';
import { AppConfigModule } from './common/config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { EmailService } from './common/email-service/EmailService';
import { EventsModule } from './events/events.module';
import { OutcomesModule } from './outcomes/outcomes.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    DatabaseModule,
    UsersModule,
    EventsModule,
    AccountsModule,
    OutcomesModule,
    BetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}


----- src/app.service.ts -----
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


----- src/bets/bet.entity.ts -----
export interface Bet {
  id: number;
  user_id: number;
  outcome_id: number;
  stake: string;
  odds: string;
  potential_payout: string;
  status: 'PENDING' | 'WON' | 'LOST' | 'CANCELLED';
  created_at: Date;
  updated_at: Date;
}

----- src/bets/bets.controller.ts -----
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetResponseDto } from './dto/bet-response.dto';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  async createBet(@Body() dto: CreateBetDto): Promise<BetResponseDto> {
    return this.betsService.createBet(dto);
  }

  @Get('user/:userId')
  async getUserBets(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BetResponseDto[]> {
    return this.betsService.getUserBets(userId);
  }
}

----- src/bets/bets.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsModule } from '../accounts/accounts.module';
import { OutcomesModule } from '../outcomes/outcomes.module';
import { BetsService } from './bets.service';
import { BetsRepository } from './bets.repository';
import { BetsController } from './bets.controller';

@Module({
  imports: [DatabaseModule, AccountsModule, OutcomesModule],
  providers: [BetsService, BetsRepository],
  controllers: [BetsController],
  exports: [BetsService, BetsRepository],
})
export class BetsModule {}

----- src/bets/bets.repository.ts -----
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Bet } from './bet.entity';

@Injectable()
export class BetsRepository {
  private static readonly TABLE_NAME = 'bets';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findById(id: number): Promise<Bet | undefined> {
    return this.knex<Bet>(BetsRepository.TABLE_NAME).where({ id }).first();
  }

  async findByUserId(userId: number): Promise<Bet[]> {
    return this.knex<Bet>(BetsRepository.TABLE_NAME)
      .where({ user_id: userId })
      .orderBy('created_at', 'desc');
  }

  async create(data: {
    user_id: number;
    outcome_id: number;
    stake: string;
    odds: string;
    potential_payout: string;
    status: 'PENDING' | 'WON' | 'LOST' | 'CANCELLED';
  }): Promise<Bet> {
    const [bet] = await this.knex<Bet>(BetsRepository.TABLE_NAME)
      .insert(data)
      .returning('*');
    return bet;
  }
}

----- src/bets/bets.service.ts -----
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BetsRepository } from './bets.repository';
import { Bet } from './bet.entity';
import { CreateBetDto } from './dto/create-bet.dto';
import { BetResponseDto } from './dto/bet-response.dto';
import { AccountsService } from '../accounts/accounts.service';
import { OutcomesRepository } from '../outcomes/outcomes.repository';
import { Money } from '../common/money/money';
import { Odds } from '../common/money/odds';

@Injectable()
export class BetsService {
  constructor(
    private readonly betsRepository: BetsRepository,
    private readonly accountsService: AccountsService,
    private readonly outcomesRepository: OutcomesRepository,
  ) {}

  async createBet(dto: CreateBetDto): Promise<BetResponseDto> {
    const outcome = await this.outcomesRepository.findById(dto.outcomeId);
    if (!outcome) {
      throw new NotFoundException(`Outcome with id ${dto.outcomeId} not found`);
    }

    if (outcome.status !== 'open') {
      throw new BadRequestException('Outcome is not open for betting');
    }

   const accountId = await this.accountsService.getPrimaryAccountId(dto.userId);

    // 4. Фиксируем коэффициент и считаем потенциальный выигрыш
    const odds = new Odds(outcome.odds);
    const stake = new Money(dto.stake);
    const potentialPayout = odds.calculatePayout(stake);

    await this.accountsService.debit(accountId, dto.stake);

    const bet = await this.betsRepository.create({
      user_id: dto.userId,
      outcome_id: dto.outcomeId,
      stake: stake.toString(),
      odds: odds.toString(),
      potential_payout: potentialPayout.toString(),
      status: 'PENDING',
    });

    return this.toResponse(bet);
  }

  async getUserBets(userId: number): Promise<BetResponseDto[]> {
    const bets = await this.betsRepository.findByUserId(userId);
    return bets.map((bet) => this.toResponse(bet));
  }

  private toResponse(bet: Bet): BetResponseDto {
    return {
      id: bet.id,
      userId: bet.user_id,
      outcomeId: bet.outcome_id,
      stake: bet.stake,
      odds: bet.odds,
      potentialPayout: bet.potential_payout,
      status: bet.status,
      createdAt: bet.created_at,
    };
  }
}

----- src/bets/dto/bet-response.dto.ts -----
export class BetResponseDto {
  id!: number;
  userId!: number;
  outcomeId!: number;
  stake!: string;
  odds!: string;
  potentialPayout!: string;
  status!: string;
  createdAt!: Date;
}

----- src/bets/dto/create-bet.dto.ts -----
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateBetDto {
  @IsInt()
  @IsPositive()
  userId!: number;

  @IsInt()
  @IsPositive()
  outcomeId!: number;

  @IsNumber()
  @IsPositive()
  stake!: number;
}

----- src/common/config/config.module.ts -----
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}


----- src/common/config/config.service.ts -----
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

@Injectable()
export class AppConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get nodeEnv(): string {
    return this.nestConfigService.get<string>('NODE_ENV', 'development');
  }

  get port(): number {
    return this.nestConfigService.get<number>('PORT', 3000);
  }

  get logLevel(): string {
    return this.nestConfigService.get<string>('LOG_LEVEL', 'info');
  }

  get database(): DatabaseConfig {
    return {
      host: this.nestConfigService.get<string>('DATABASE_HOST', 'localhost'),
      port: this.nestConfigService.get<number>('DATABASE_PORT', 5432),
      user: this.nestConfigService.get<string>('DATABASE_USER', 'postgres'),
      password: this.nestConfigService.get<string>(
        'DATABASE_PASSWORD',
        'postgres',
      ),
      database: this.nestConfigService.get<string>(
        'DATABASE_NAME',
        'betting_platform',
      ),
    };
  }
}


----- src/common/email-service/EmailService.ts -----
import { Injectable } from '@nestjs/common';
import { AppLoggerService } from '../logger/logger.service';

@Injectable()
export class EmailService {
  constructor(private readonly appLoggerService: AppLoggerService) {}

  sendEmail(receiver: string, subject: string, body: string): void {
    // Implement your email sending logic here
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    this.appLoggerService.log(
      'Sending email to: ' +
        receiver +
        ' with subject: ' +
        subject +
        ' and body: ' +
        body,
    );
  }
}


----- src/common/logger/logger.module.ts -----
import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';
import { AppLoggerService } from './logger.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class LoggerModule {}


----- src/common/logger/logger.service.ts -----
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: AppConfigService) {
    this.logger = winston.createLogger({
      level: this.configService.logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'betting-platform' },
      transports: [new winston.transports.Console()],
    });
  }

  log(message: unknown, context?: string): void {
    this.logger.info(this.toMessage(message), { context });
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.logger.error(this.toMessage(message), { trace, context });
  }

  warn(message: unknown, context?: string): void {
    this.logger.warn(this.toMessage(message), { context });
  }

  debug(message: unknown, context?: string): void {
    this.logger.debug(this.toMessage(message), { context });
  }

  verbose(message: unknown, context?: string): void {
    this.logger.verbose(this.toMessage(message), { context });
  }

  private toMessage(message: unknown): string {
    return message instanceof Error
      ? message.message
      : typeof message === 'string'
        ? message
        : JSON.stringify(message);
  }
}


----- src/common/money/money.ts -----
import { Decimal } from 'decimal.js';

export class Money {
  private readonly value: Decimal;

  constructor(amount: string | number | Decimal) {
    this.value = new Decimal(amount);
  }

  add(other: Money): Money {
    return new Money(this.value.plus(other.value));
  }

  subtract(other: Money): Money {
    return new Money(this.value.minus(other.value));
  }

  multiply(factor: number | Money | Decimal): Money {
    return new Money(this.value.times(factor instanceof Money ? factor.value : factor));
  }

  divide(divisor: number | Money | Decimal): Money {
    return new Money(this.value.dividedBy(divisor instanceof Money ? divisor.value : divisor));
  }

  compareTo(other: Money): number {
    return this.value.comparedTo(other.value);
  }

  isZero(): boolean {
    return this.value.isZero();
  }

  isPositive(): boolean {
    return this.value.isPositive();
  }

  isNegative(): boolean {
    return this.value.isNegative();
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  toString(): string {
    return this.value.toString();
  }

  toFixed(decimals: number = 2): string {
    return this.value.toFixed(decimals);
  }

  static fromNumber(amount: number): Money {
    return new Money(amount);
  }

  static zero(): Money {
    return new Money(0);
  }
}

----- src/common/money/odds.ts -----
import { Decimal } from 'decimal.js';
import { Money } from './money';

export class Odds {
  private readonly value: Decimal;

  constructor(odds: string | number | Decimal) {
    this.value = new Decimal(odds);
  }

  calculatePayout(stake: Money): Money {
    return stake.multiply(this.value);
  }

  toNumber(): number {
    return this.value.toNumber();
  }

  toString(): string {
    return this.value.toString();
  }

  toFixed(decimals: number = 2): string {
    return this.value.toFixed(decimals);
  }

}

----- src/database/database.constants.ts -----
export const KNEX_CONNECTION = Symbol('KNEX_CONNECTION');


----- src/database/database.module.ts -----
import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { AppConfigModule } from '../common/config/config.module';
import { AppConfigService } from '../common/config/config.service';
import { KNEX_CONNECTION } from './database.constants';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: KNEX_CONNECTION,
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService): Knex =>
        knex({
          client: 'pg',
          connection: configService.database,
        }),
    },
  ],
  exports: [KNEX_CONNECTION],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(KNEX_CONNECTION) private readonly knexConnection: Knex) {}

  async onModuleDestroy(): Promise<void> {
    await this.knexConnection.destroy();
  }
}


----- src/database/migrations/20260829110806_create_users_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phoneNumber').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}


----- src/database/migrations/20260829120000_create_accounts_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.decimal('balance', 14, 2).notNullable().defaultTo(0);
    table.timestamps(true, true);
    table.check('balance >= 0');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('accounts');
}


----- src/database/migrations/20260906182130_create_transactions_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table
      .integer('account_id')
      .notNullable()
      .references('id')
      .inTable('accounts')
      .onDelete('CASCADE');
    table.string('type').notNullable();
    table.decimal('amount', 14, 2).notNullable();
    table.decimal('balance_after', 14, 2).notNullable();
    table.text('description').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
}

----- src/database/migrations/20260922174641_create_events_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('events', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable(); 
    table.timestamp('start_time').notNullable(); 
    table
      .string('status')
      .notNullable()
      .defaultTo('scheduled'); 
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('events');
}

----- src/database/migrations/20260922175445_create_outcomes_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('outcomes', (table) => {
    table.increments('id').primary();
    table
      .integer('event_id')
      .notNullable()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE'); 
    table.string('name').notNullable(); 
    table.decimal('odds', 10, 2).notNullable(); 
    table
      .string('status')
      .notNullable()
      .defaultTo('open');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('outcomes');
}


----- src/database/migrations/20260922193048_create_bets_table.ts -----
import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bets', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('outcome_id')
      .notNullable()
      .references('id')
      .inTable('outcomes')
      .onDelete('CASCADE');
    table.decimal('stake', 14, 2).notNullable();
    table.decimal('odds', 10, 2).notNullable(); 
    table.decimal('potential_payout', 14, 2).notNullable();
    table
      .string('status')
      .notNullable()
      .defaultTo('PENDING'); 
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bets');
}

----- src/events/dto/create-event.dto.ts -----
import { IsString, IsNotEmpty, IsDateString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsDateString()
  start_time!: string;
}

----- src/events/event.entity.ts -----
export interface Event {
  id: number;
  name: string;
  start_time: Date;
  status: 'scheduled' | 'closed' | 'settled' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

----- src/events/events.controller.ts -----
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}

----- src/events/events.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { EventsController } from './events.controller';

@Module({
  imports: [DatabaseModule],
  providers: [EventsService, EventsRepository],
  controllers: [EventsController],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}

----- src/events/events.repository.ts -----
// src/events/events.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Event } from './event.entity';

type EventStatus = 'scheduled' | 'closed' | 'settled' | 'cancelled';

@Injectable()
export class EventsRepository {
  private static readonly TABLE_NAME = 'events';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findAll(): Promise<Event[]> {
    return this.knex<Event>(EventsRepository.TABLE_NAME)
      .select('*')
      .orderBy('start_time', 'desc');
  }

  async findById(id: number): Promise<Event | undefined> {
    return this.knex<Event>(EventsRepository.TABLE_NAME).where({ id }).first();
  }

  async create(data: {
    name: string;
    start_time: Date;
    status?: EventStatus;
  }): Promise<Event> {
    const [event] = await this.knex<Event>(EventsRepository.TABLE_NAME)
      .insert({
        name: data.name,
        start_time: data.start_time,
        status: data.status ?? 'scheduled',
      })
      .returning('*');
    return event;
  }

  async updateStatus(id: number, status: EventStatus): Promise<Event | undefined> {
    const [event] = await this.knex<Event>(EventsRepository.TABLE_NAME)
      .where({ id })
      .update({ status, updated_at: new Date() })
      .returning('*');
    return event;
  }
}

----- src/events/events.service.ts -----
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.findAll();
  }

  async findById(id: number): Promise<Event> {
    const event = await this.eventsRepository.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async create(dto: CreateEventDto): Promise<Event> {
    return this.eventsRepository.create({
      name: dto.name,
      start_time: new Date(dto.start_time),
      status: 'scheduled',
    });
  }
}

----- src/main.ts -----
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './common/config/config.service';
import { AppLoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(AppLoggerService));
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(AppConfigService);

  await app.listen(configService.port, '0.0.0.0');
}
bootstrap();


----- src/outcomes/dto/create-outcome.dto.ts -----
import { IsNumber, IsPositive, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateOutcomeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(1.01)
  odds!: number;
}

----- src/outcomes/outcome.entity.ts -----
export interface Outcome {
  id: number;
  event_id: number;
  name: string;
  odds: string;
  status: 'open' | 'won' | 'lost' | 'void';
  created_at: Date;
  updated_at: Date;
}

----- src/outcomes/outcomes.controller.ts -----
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OutcomesService } from './outcomes.service';
import { CreateOutcomeDto } from './dto/create-outcome.dto';

@Controller('events/:eventId/outcomes')
export class OutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Get()
  async findByEventId(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.outcomesService.findByEventId(eventId);
  }

  @Post()
  async create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() dto: CreateOutcomeDto,
  ) {
    return this.outcomesService.create(eventId, dto);
  }
}

----- src/outcomes/outcomes.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';
import { OutcomesService } from './outcomes.service';
import { OutcomesRepository } from './outcomes.repository';
import { OutcomesController } from './outcomes.controller';

@Module({
  imports: [DatabaseModule, EventsModule],
  providers: [OutcomesService, OutcomesRepository],
  controllers: [OutcomesController],
  exports: [OutcomesService, OutcomesRepository],
})
export class OutcomesModule {}

----- src/outcomes/outcomes.repository.ts -----
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Outcome } from './outcome.entity';

type OutcomeStatus = 'open' | 'won' | 'lost' | 'void';

@Injectable()
export class OutcomesRepository {
  private static readonly TABLE_NAME = 'outcomes';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findByEventId(eventId: number): Promise<Outcome[]> {
    return this.knex<Outcome>(OutcomesRepository.TABLE_NAME)
      .where({ event_id: eventId })
      .orderBy('id', 'asc');
  }

  async findById(id: number): Promise<Outcome | undefined> {
    return this.knex<Outcome>(OutcomesRepository.TABLE_NAME).where({ id }).first();
  }

  async create(data: {
    event_id: number;
    name: string;
    odds: string;
    status?: OutcomeStatus;
  }): Promise<Outcome> {
    const [outcome] = await this.knex<Outcome>(OutcomesRepository.TABLE_NAME)
      .insert({
        event_id: data.event_id,
        name: data.name,
        odds: data.odds,
        status: data.status ?? 'open',
      })
      .returning('*');
    return outcome;
  }
}

----- src/outcomes/outcomes.service.ts -----
import { Injectable, NotFoundException } from '@nestjs/common';
import { OutcomesRepository } from './outcomes.repository';
import { Outcome } from './outcome.entity';
import { CreateOutcomeDto } from './dto/create-outcome.dto';
import { EventsRepository } from '../events/events.repository';

@Injectable()
export class OutcomesService {
  constructor(
    private readonly outcomesRepository: OutcomesRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async findByEventId(eventId: number): Promise<Outcome[]> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    return this.outcomesRepository.findByEventId(eventId);
  }

  async create(eventId: number, dto: CreateOutcomeDto): Promise<Outcome> {
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    return this.outcomesRepository.create({
      event_id: eventId,
      name: dto.name,
      odds: dto.odds.toFixed(2),
      status: 'open',
    });
  }
}

----- src/transactions/transaction.entity.ts -----
export interface Transaction {
  id: number;
  account_id: number;
  type: 'CREDIT' | 'DEBIT';
  amount: string;
  balance_after: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

----- src/transactions/transactions.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [DatabaseModule],
  providers: [TransactionsRepository],
  exports: [TransactionsRepository], 
})
export class TransactionsModule {}

----- src/transactions/transactions.repository.ts -----
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsRepository {
  private static readonly TABLE_NAME = 'transactions';

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async create(
    accountId: number,
    type: 'CREDIT' | 'DEBIT',
    amount: string,
    balanceAfter: string,
    trx: Knex.Transaction,
    description?: string,
  ): Promise<Transaction> {
    const [transaction] = await trx<Transaction>(
      TransactionsRepository.TABLE_NAME,
    )
      .insert({
        account_id: accountId,
        type,
        amount,
        balance_after: balanceAfter,
        description,
      })
      .returning('*');

    return transaction;
  }

  async findByAccountId(accountId: number): Promise<Transaction[]> {
    return this.knex<Transaction>(TransactionsRepository.TABLE_NAME)
      .where({ account_id: accountId })
      .orderBy('created_at', 'desc');
  }
}

----- src/users/dto/create-user.dto.ts -----
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}


----- src/users/user.entity.ts -----
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  created_at: Date;
  updated_at: Date;
}


----- src/users/users.controller.ts -----
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}


----- src/users/users.module.ts -----
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}


----- src/users/users.repository.ts -----
import { Inject, Injectable } from '@nestjs/common';
import type { Knex } from 'knex';
import { KNEX_CONNECTION } from '../database/database.constants';
import { CreateUserDto } from './dto/create-user.dto';
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


----- src/users/users.service.ts -----
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }
}


========== END OF DUMP ==========
