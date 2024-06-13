FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN chown -R node /usr/src/app
USER node
CMD [ "npm", "run", "dev" ]
