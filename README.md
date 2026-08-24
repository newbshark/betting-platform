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