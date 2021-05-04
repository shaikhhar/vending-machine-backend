
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ start mysql server 
$ add database config details in env files: check samples .dev.env.example and .test.env.example
$ create a database (eg: vending_machine )
$ npm run start
$ create product from /products/create endpoints (assumed to be Admin task)
$ create paymentMode from /money/deposit endpoints (assumed to be Admin task)


# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# env files
check samples .dev.env.example and .test.env.example


