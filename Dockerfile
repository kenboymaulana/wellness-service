FROM node:16-alpine

WORKDIR /app
COPY . /app

RUN npm install --force && npm run build

CMD ["node", "dist/main.js"]