# Db-manager

Provides database management utilities to Pubsweet apps.

## Usage

This package exports the following functions:

- `setupDb`
- `addUser`
- `dbExists`
- `migrate`

### `setupDb`

This function

- creates the database
- adds an admin user
- generates a secret in `config/local-<NODE_ENV>.json` under `pubsweet-server.secret`.

It can be called without arguments, in which case it will take its configuration from the following config keys:

```
{
  'pubsweet-server': {
    db: {
      //  takes the same configuration options as https://node-postgres.com/features/connecting#programmatic
    }
  },
  dbManager: {
    username: 'xxxxxx',
    password: 'pppppp',
    email: 'email@example.com',
    clobber: false // overwrite existing db (optional)
  }
}
```

Alternatively it can be passed the `dbManager` object as an argument, which will override the values on config.

The name of the database will be the full `dbPath`.

### `addUser`

This function adds a user to an already existing database. It requires a user object as argument:

```
addUser({
  username: 'xxxxxx',
  password: 'pppppp',
  email: 'email@example.com',
  admin: true // (optional)
})
```

### `dbExists`

This function checks if any database exists at the configured path. Returns `true` or `false`

### `migrate`

This function performs pending migrations.
