FROM node:16-bullseye-slim AS packages

WORKDIR /app
COPY package.json yarn.lock ./

COPY packages packages

RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -exec rm -rf {} \+

FROM node:16-bullseye-slim AS build

WORKDIR /app
COPY --from=packages /app .
 
RUN apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev python3 build-essential && \
    yarn config set python /usr/bin/python3

RUN yarn install --frozen-lockfile --network-timeout 600000 && rm -rf "$(yarn cache dir)"

COPY . .

RUN yarn tsc

RUN yarn --cwd packages/backend build

FROM node:16-bullseye-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends libsqlite3-dev python3 build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    yarn config set python /usr/bin/python3

WORKDIR /app

ENV NODE_ENV production

COPY --from=build --chown=node:node /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton.tar.gz ./

RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn install --frozen-lockfile --production --network-timeout 600000 && rm -rf "$(yarn cache dir)"

COPY --from=build --chown=node:node /app/packages/backend/dist/bundle.tar.gz .

RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install mkdocs-techdocs-core==1.0.1

COPY github.yaml ./
COPY --chown=node:node app-config.yaml ./
COPY --chown=node:node app-config.production.yaml ./

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]