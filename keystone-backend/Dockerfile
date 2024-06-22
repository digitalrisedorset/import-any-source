FROM node:18-alpine

WORKDIR /user/src/keystone-backend

COPY ./.keystone ./
COPY . .

RUN yarn install

CMD ["yarn", "keystone", "dev"]
