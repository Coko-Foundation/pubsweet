FROM node:10
MAINTAINER PubSweet Community <jure@coko.foundation>

WORKDIR /root

COPY yarn.lock .
COPY package.json .

# We do a development install because react-styleguidist is a dev dependency
RUN [ "yarn", "install", "--frozen-lockfile" ]

# Remove cache
RUN [ "yarn", "cache", "clean"]

COPY . .

ENV NODE_ENV "production"

EXPOSE 3000

CMD []
