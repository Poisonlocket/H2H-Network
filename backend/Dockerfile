FROM oven/bun:alpine

WORKDIR /app

COPY . .
RUN bun install --frozen-lockfile

EXPOSE 3000

CMD ["bun", "run", "start"]