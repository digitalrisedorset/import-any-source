FROM herve010/keystone-init:0.0.3

RUN yarn build
RUN yarn keystone prisma db push

CMD ["yarn", "start"]
