FROM node:18-alpine
EXPOSE 8080
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
RUN cd frontend && npm install && npm run build
CMD ["npm", "run", "start:prod"]