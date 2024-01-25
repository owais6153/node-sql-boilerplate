# Node Boilerplate With SQL (Sequelize)

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 18.16.1
- Install [MySQL 8](https://dev.mysql.com/downloads/mysql/)
- Create database named in MySQL

# Getting started

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Create .env file on the root of project and populate it with values, for reference check .envExample file on the root of project

- Install dependencies

```
cd <project_name>
npm install
```

- Run migrations

```
npx sequelize db:migrate
```

- Populate database with seeders

```
npx sequelize db:seed:all
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:4040`

# ES Lint and Prettier

- Check if the formatting matches the Prettier’s rules by using:

```
npm run format:check
```

- Force the formatting by using this command:

```
npm run format:write
```

- Lint your code with:

```
npm run lint:check
```
