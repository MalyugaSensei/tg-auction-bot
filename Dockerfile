FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD [ "npm", "run", "start.dev" ]
