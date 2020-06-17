<h1 align="center">
  🐕‍🦺 PetCRM** 
</h1>
  <p align="center">Backend for a CRM for pet daycares. Built with NestJS, GraphQL, MongoDB.</p>
  <p align="center">**(need cute name)</p>

## Installation

```bash
$ npm install
```

Also make sure to have docker installed.

## Running the app

A `.env` file needs to be created with the following variables set

```conf
JWT_COOKIE_NAME=
SERVER_PORT=
DB_USERNAME=
DB_PASSWD=
DB_DATABASE_NAME=
DB_HOST=
DB_PORT=
```

```bash
# development
$ docker-compose up

# re-build development
$ docker-compose up --build -V

# production mode
$ # todo
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
