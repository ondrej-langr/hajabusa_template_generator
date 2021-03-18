FROM node:12.16-alpine as development

RUN mkdir -p /backend
WORKDIR /backend

COPY package.json ./
RUN yarn install

COPY . .
CMD ["sh","-c", "npx prisma generate && yarn start"]