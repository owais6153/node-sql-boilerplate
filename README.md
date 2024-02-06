# Node.js, Express.js Boilerplate With Sequelize ORM

A template repository boilerplate for building RESTful APIs using Node.js, Express.js, and Sequelize and with sequelize-cli support. This template includes common [feature-specific branches](#feature-branches) to merge into your repository if needed.

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 18.16.1
- Install [MySQL 8](https://dev.mysql.com/downloads/mysql/)
- Create database named in MySQL

# Getting started

- Create repository from template

- Create .env file on the root of project and populate it with values, for reference check .envExample file on the root of project

```
 cd <project_name>
 cp .env.example .env
```

- Install dependencies

```
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

- Start Project in Development Env

```
npm run dev
```

- Start Project in Production Env

```
npm start
```

Navigate to `http://localhost:4040`

# ES Lint and Prettier

- Check if the formatting matches the Prettier’s rules by using:

```
npm run format
```

- Force the formatting by using this command:

```
npm run format:fix
```

- Lint your code with:

```
npm run lint
```

- Force the linting by using this command:

```
npm run lint:fix
```

# Feature Branches

Merge branches to implement features listed below

### Features

- Swagger Docs: `feat/swagger-docs`
- Twilio SMS: `feat/twilio-SMS`
- Sendgrid Emai: `feat/sendgrid-mail`
- AWS S3 Bucket: `feat/AWS-S3-bucket`
- Sockets: `feat/sockets`
- Node Cron: `feat/node-cron`

### CI (Continues Integration)

- JEST Integration Tests (Git Actions): `ci/jest-test`

## Note

If you've created the repository without branches, or you want to get any specific feature branch without getting all branches then you can fetch a specific branch by running the below commands:

```
git remote add template <template_repository_url>
git fetch template <template_repo_branch_name>
git checkout <template_repo_branch_name>
git push origin <template_repo_branch_name>
```

By running the above commands that specfic branch will pushed to your repo.
