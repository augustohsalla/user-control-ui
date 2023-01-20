FROM node:12.7-alpine AS build
WORKDIR /src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT

ENV PROXY_API=$PROXY_API

ENV PROXY_LOGIN=$PROXY_LOGIN

# Start the app
CMD [ "npm", "start" ]