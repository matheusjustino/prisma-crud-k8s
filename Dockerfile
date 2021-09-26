FROM node:14.17.5-alpine3.14 as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install --production --frozen-lockfile

COPY . .

RUN yarn build


FROM node:14.17.5-alpine3.14

RUN apk add --no-cache bash

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
	&& tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
	&& rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.docker ./.docker

EXPOSE 3000

ENTRYPOINT [ ".docker/entrypoint.sh" ]
