FROM node:21

WORKDIR /app

COPY . /app

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

CMD ["node", "build/server"]
