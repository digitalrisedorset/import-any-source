FROM node:18-alpine

ARG APP=/user/src/node-backend

WORKDIR $APP

VOLUME csv_import $APP/csv_import

COPY package*.json ./

RUN npm install -g typescript  && \
    npm ci --only=production

COPY . .

CMD ["npm", "run", "start"]