FROM node:24-alpine
WORKDIR /app
COPY  package*.json ./
EXPOSE 3000
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]