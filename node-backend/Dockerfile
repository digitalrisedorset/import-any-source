FROM node:18-alpine

WORKDIR /user/src/node-backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "start"]