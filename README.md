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

# Roadmap (9th of October, 2015)

Next two weeks (12-23 October):

1. Backend and data structure
  1. Collections and Fragments
  2. API
  3. No front end dev
  4. Tests
  5. Navigation

Week after that (26-30 October):

2. Integrate next version of Substance
  1. Evaluate backend API in this context

And the week after that (2-7 November):

3. Share component collaboration
  1. Substance sans editing
  2. System share integration