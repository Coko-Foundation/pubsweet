There are a number of ways of running the application in development.

1. Hybrid - runs backing services with Docker but keeps the Node process on the host. Recommended for most developers.
2. Docker - runs everything in Docker. Easiest to get started but has limitations.
3. No Docker - doesn't require Docker. Requires a bit more up front set up.

## Hybrid

### Requirements

- Node.JS >8.9
- Docker

### Setup

```bash
yarn
yarn start:services
# in another terminal
yarn server
# or for running tests (db has to be running)
yarn test
```

### Explanation

This the recommended way to develop PubSweet applications as it minimises system software dependencies and maximises flexibility.

- `yarn` installs JavaScript dependencies
- `yarn start:services` uses Docker Compose to start containers for the backing services (at present just the PostgreSQL database)
- `yarn server` runs `pubsweet server` which does a number of things:
  - set up the database if necessary, including a default user (with credentials `admin`/`password` by default)
  - build client side application with Webpack
  - start server application with Express

## Full Docker

### Requirements

- Docker

### Setup

```bash
docker-compose up
# or `yarn start` if you have Node
# or `pubsweet start` if you have PubSweet CLI
```

### Explanation

This is the easiest way to get up and running after cloning a PubSweet application.

Docker Compose does the following:

- start containers for the backing services (database)
- start a container and mount the code from the host into the it
- run `yarn` in the container to install dependencies
- run `pubsweet server` (see above for details of what this does)

This setup has a number of drawbacks:

- file watching and reloading is slower
- harder to debug Node process
- can't `npm link` dependencies outside of the project root
- can lead to issues with file permissions

## No Docker

### Requirements

- Node >8.9
- PostgreSQL >9.6

### Setup

Start PostgreSQL server according to your OS, create a database and configure the connection details in the PubSweet application.

```bash
yarn
yarn server
```

If you setup a user and password for you PostgreSQL database and you get an error like

```bash
error: error: password authentication failed for user ...
```

you can write the correct credentials in config/default.js, in `pubsweet-server.db` like so

```js static
    'pubsweet-server': {
        db: {
            user: ...,
            password: ...,
            // these are optional, in case you don't use default
            host: ...,
            database: ...,
            port: ...
        },
```

More information on the db javascript object [here](https://node-postgres.com/api/pool).

### Explanation

By installing PostgreSQL server natively on you machine, you remove the need for Docker but that requires a bit more up front configuration. See above for details of what the `server` command does.
