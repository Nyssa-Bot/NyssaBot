FROM node:20.7-bullseye-slim

WORKDIR /app

COPY / /app/

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start"]
