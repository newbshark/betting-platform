import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountsService } from '../accounts/accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsController } from './accounts.controller';