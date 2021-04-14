FROM node:15.13.0-alpine3.10

WORKDIR /usr/src/app

RUN npm install -g serve

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]