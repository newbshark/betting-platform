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
