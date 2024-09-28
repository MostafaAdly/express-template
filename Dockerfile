
FROM node:20
WORKDIR /app
RUN npm i -g bun nodemon pm2
COPY package.json /app
RUN yarn
COPY . /app
CMD ["yarn", "start"]