# Preconditions

Have Postgres 9.x installed, and Node 0.12.7.

Postgres you can install via `brew install postgres`. Run it via.

```bash
$ postgres -D /usr/local/var/postgres
```

Now create a db `pubsweet`.

```bash
$ createdb pubsweet
```

# Install

```bash
$ git clone git@gitlab.coko.foundation:jure/backend-node.git
$ cd backend-node
$ npm install
$ npm run db-migrate up
```

# Start the server

```bash
$ npm run hot
```

Point your browser to: http://localhost:3000