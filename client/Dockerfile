FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN yarn && yarn build

EXPOSE 9000

CMD ["yarn", "start"]
