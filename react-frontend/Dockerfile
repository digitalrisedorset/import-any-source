FROM node:alpine

WORKDIR /user/src/react-frontend

COPY package*.json ./

RUN npm install -g react-scripts && \
    npm install && \
    npm ci --only=production

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]