FROM node:20.12.1-alpine as build
RUN apk update && apk upgrade

WORKDIR /app
COPY ./ .
RUN npm install
RUN npm run build

FROM node:20.12.1-alpine as production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./

CMD ["/bin/sh", "-c", "node src/main.js"]
