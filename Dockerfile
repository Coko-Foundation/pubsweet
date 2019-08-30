FROM node:10
MAINTAINER PubSweet Community <jure@coko.foundation>

COPY . . 

RUN [ "yarn", "config", "set", "workspaces-experimental", "true" ]

# We do a development install because react-styleguidist is a dev dependency
RUN [ "yarn", "install", "--frozen-lockfile" ]

# Remove cache and offline mirror
RUN [ "yarn", "cache", "clean"]
RUN [ "rm", "-rf", "/npm-packages-offline-cache"]

ENV NODE_ENV "production"

# Temporarily disable styleguide due to Babel incompatibility
# WORKDIR ${HOME}/packages/styleguide
# RUN [ "npm", "run", "styleguide:build" ]
# Create file for kubernetes health checks
# RUN touch ./styleguide/health

EXPOSE 3000

WORKDIR ${HOME}
CMD []
