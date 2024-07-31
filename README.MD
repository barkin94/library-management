# library-management

This is a simple Node.js application to manage libraries. It exposes endpoints that can add create/view users and books, and record book borrow and returns. Project's stack is Typescript, Express.js, PostgreSQL (TypeORM)

## Installation

Install Node version 20.16.0 

Install dependencies
```bash
npm i
```

Create a .env file in project root with the contents of .env.example. 

## Usage

Create a temporary Postgre instance with the command below. (Or you may use your own Postgre instance if you like. You will need to modify POSTGRES_UR variable in .env)
```bash
docker compose up -d
```

Run the application. No migrations needed. TypeORM will automatically load the tables based on the entity definitions in the code.
```bash
npm run start:dev
```

Kill the temporary db when you are done
```bash
docker compose down
```