FROM "ubuntu"

WORKDIR /app

COPY . .

RUN pnpm install 

RUN pnpm build

EXPOSE 3000 

CMD [ "pnpm", "start"]