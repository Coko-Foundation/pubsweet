[![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/pubsweet/db-manager/raw/master/LICENSE) 
[![npm](https://img.shields.io/npm/v/pubsweet.svg)](https://npmjs.com/package/@pubsweet/db-manager) 
[![build status](https://gitlab.coko.foundation/yld/db-manager/badges/master/build.svg)](https://gitlab.coko.foundation/yld/db-manager/commits/master)
[![coverage report](https://gitlab.coko.foundation/yld/db-manager/badges/master/coverage.svg)](https://gitlab.coko.foundation/yld/db-manager/commits/master) 
[![code style standard](https://img.shields.io/badge/code%20style-standard-green.svg)](https://standardjs.com/) 
[![mattermost chat](https://img.shields.io/badge/mattermost_chat-coko%2Fpubsweet-blue.svg)](https://mattermost.coko.foundation/coko/channels/pubsweet)

# Db-manager

Provides database management utilities to Pubsweet apps.

## Usage

This package exports the following functions:

 - `setupDB`
 - `addUser`
 - `dbExists`

### `setupDb`

This function
 - creates the database
 - adds an admin user
 - adds a collection if specified
 - generates a secret in `config/local-<NODE_ENV>.json` under `pubsweet-server.secret`. 

It can be called without arguments, in which case it will take its configuration from the following config keys:

```
{
  'pubsweet-server': {
    dbPath: 'path/where/db/will/be/created',
    adapter: 'leveldb' // or 'memory' or 'http' (optional) 
  },
  dbManager: {
    username: 'xxxxxx',
    password: 'pppppp',
    email: 'email@example.com',
    clobber: false // overwrite existing db (optional)
    collection: 'collection_title' // (optional)
  }
}
```
Alternatively it can be passed the `dbManager` object as an argument, which will override the values on config.

The name of the database will be the full dbPath with the NODE_ENV appended.

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

This function checks if any database exists at the configured path for the current NODE_ENV. Returns `true` or `false`

