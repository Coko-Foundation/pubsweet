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

### `setupDb`

This function creates the database, adds a user and adds a collection if specified. It is called without arguments and takes its configuration from the following config keys:

```
{
  'pubsweet-server': {
    dbPath: 'path/where/db/will/be/created',
    adapter: 'leveldb' // or 'memory' or 'http' (optional) 
  },
  dbManager: {
    user: {
      username: 'xxxxxx',
      password: 'pppppp',
      email: 'email@example.com'
    },
    collection: 'collection_title' // (optional)
  }
}
```

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

