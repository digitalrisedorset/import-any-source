FROM herve010/keystone-init:0.0.9

COPY keystone.ts .
COPY schemas/* schemas/
COPY config.ts .

RUN yarn build
#RUN yarn keystone prisma db push

CMD ["yarn", "start"]