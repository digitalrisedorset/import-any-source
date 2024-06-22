FROM node:alpine

WORKDIR /user/src/react-frontend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]