FROM node:12

ENV HOME "/home/pubsweet"
RUN mkdir -p ${HOME}
WORKDIR ${HOME}

COPY . .

RUN [ "yarn", "config", "set", "workspaces-experimental", "true" ]
RUN [ "yarn", "install", "--frozen-lockfile" ]

# Remove cache and offline mirror
RUN [ "yarn", "cache", "clean" ]
RUN [ "rm", "-rf", "/npm-packages-offline-cache" ]

RUN [ "yarn", "build" ]
ENV NODE_ENV "production"

EXPOSE 3000

CMD []
