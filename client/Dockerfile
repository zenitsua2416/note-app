FROM node:20.18-alpine3.21 AS builder

WORKDIR /app

RUN npm install -g pnpm@10.8.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM nginx:1.27-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
