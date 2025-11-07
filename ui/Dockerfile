FROM node:16-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN chown -R node:node /src
USER node

ARG CLIENT_PORT
ENV PORT=${CLIENT_PORT}
EXPOSE ${CLIENT_PORT}

CMD ["npm", "run", "start"]
