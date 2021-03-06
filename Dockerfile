FROM node:12.16.3 AS development
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.16.3-alpine AS production
WORKDIR /app
COPY --from=development /app ./
CMD ["npm", "run", "start:prod"]