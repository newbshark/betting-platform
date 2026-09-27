# Betting Platform

Backend букмекерской платформы на NestJS.

## Tech Stack

- Node.js 20
- NestJS 11
- TypeScript
- pnpm
- PostgreSQL 16
- Knex (query builder + миграции)
- Decimal.js (точные вычисления денег)
- class-validator / class-transformer
- Winston (логирование)
- Jest (тесты)

## Архитектура

Модульная структура NestJS. Правила:

1. **Knex — только в репозиториях.** Сервисы не знают о Knex.
2. **Транзакции БД — в репозиториях.** `creditWithTransaction` / `debitWithTransaction` живут в `AccountsRepository`.
3. **`Money` создаётся в сервисе**, не в контроллере.
4. **Контроллер — только роутинг.** Логика — в сервисе.
5. **DTO + `class-validator`** для валидации.
6. **`ParseIntPipe`** для числовых параметров.

```text
src/
├── accounts/                 # Счета пользователей
│   ├── transactions/         # Credit / debit операции (отдельный модуль)
│   │   ├── dto/
│   │   ├── accounts-transactions.controller.ts
│   │   ├── accounts-transactions.service.ts
│   │   └── accounts-transactions.module.ts
│   ├── dto/
│   ├── account.entity.ts
│   ├── accounts.controller.ts
│   ├── accounts.repository.ts
│   ├── accounts.service.ts
│   └── accounts.module.ts
│
├── bets/                     # Ставки
├── common/
│   ├── config/               # Конфигурация (env)
│   ├── email-service/        # Email (пока лог)
│   ├── logger/               # Winston-логгер
│   └── money/                # Money и Odds (обёртки над Decimal)
│
├── database/
│   ├── migrations/           # Миграции Knex
│   ├── database.constants.ts
│   └── database.module.ts
│
├── events/                   # События (матчи)
├── outcomes/                 # Исходы (с коэффициентами)
├── transactions/             # Ledger — история операций
├── users/                    # Пользователи
│
├── app.module.ts
└── main.ts
```

## Что работает

- ✅ Пользователи (создание, поиск)
- ✅ Счета (создание, баланс)
- ✅ Пополнение / списание с блокировкой `FOR UPDATE`
- ✅ Ledger — все операции пишутся в `transactions`
- ✅ События (матчи)
- ✅ Исходы (привязаны к событиям, с коэффициентами)
- ✅ Ставки (реально списывают деньги, создают транзакцию)

## Запуск

```bash
# 1. Зависимости
pnpm install

# 2. Postgres в Docker
docker compose up -d

# 3. Миграции
pnpm run migrate:latest

# 4. Dev-сервер
pnpm run dev
```

## Скрипты

- `pnpm run build` — сборка
- `pnpm run start:dev` — dev с watch
- `pnpm run dev` — миграции + dev с watch
- `pnpm run migrate:latest` — применить миграции
- `pnpm run migrate:rollback` — откатить последнюю
- `pnpm run migrate:make <name>` — создать миграцию
- `pnpm test` — юнит-тесты

## API (ключевые роуты)

### Пользователи
- `POST /users` — создать
- `GET /users` — список
- `GET /users/:id` — по id

### Счета
- `POST /accounts` — создать счёт (`{ "userId": 1 }`)
- `GET /accounts/:userId/balance` — баланс основного счёта

### Транзакции по счёту
- `POST /accounts/:accountId/credit` — пополнение (`{ "amount": 100 }`)
- `POST /accounts/:accountId/debit` — списание (`{ "amount": 50 }`)

### События и исходы
- `POST /events` — создать событие
- `GET /events` — список
- `POST /events/:eventId/outcomes` — создать исход
- `GET /events/:eventId/outcomes` — исходы события

### Ставки
- `POST /bets` — создать ставку (`{ "userId": 1, "outcomeId": 1, "stake": 10 }`)
- `GET /bets/user/:userId` — ставки пользователя

## Деньги

Все денежные вычисления — через `Money` (обёртка над `decimal.js`). `Odds` — обёртка для коэффициентов. В БД деньги — `numeric(14, 2)`, возвращаются как строки.

Наружу деньги и коэффициенты отдаются в формате `toFixed(2)` (`"185.00"`, `"1.85"`).