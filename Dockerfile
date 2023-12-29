FROM node:18 AS development

ENV NODE_ENV=development

WORKDIR D:\Owais\MERN\node-backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD [ "sh", "-c", "npm start" ]