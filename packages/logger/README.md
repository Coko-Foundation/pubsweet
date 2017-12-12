[![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/pubsweet/pubsweet-logger/raw/master/LICENSE) 
[![npm](https://img.shields.io/npm/v/pubsweet.svg)](https://npmjs.com/package/@pubsweet/logger) 
[![build status](https://gitlab.coko.foundation/yld/pubsweet-logger/badges/master/build.svg)](https://gitlab.coko.foundation/yld/pubsweet-logger/commits/master)
[![coverage report](https://gitlab.coko.foundation/yld/pubsweet-logger/badges/master/coverage.svg)](https://gitlab.coko.foundation/yld/pubsweet-logger/commits/master) 
[![code style standard](https://img.shields.io/badge/code%20style-standard-green.svg)](https://standardjs.com/) 
[![mattermost chat](https://img.shields.io/badge/mattermost_chat-coko%2Fpubsweet-blue.svg)](https://mattermost.coko.foundation/coko/channels/pubsweet)

# @pubsweet/logger

A module encapsulating standard logging features for pubsweet components and services.

## Usage

Either: 

```javascript
const myLogger = require('winston') // or something else
const logger = require('@pubsweet/logger')
logger.configure(mylogger)
```

Or set the logger in config:

```javascript
const myLogger = require('winston') // or something else

{
  'pubsweet-server':{
    logger: myLogger
  }
}
```

The configured logger can then be imported from anywhere:

```javascript
const logger = require('@pubsweet/logger')
logger.info('log')
```

The logger exposes the following methods:
 - `info`
 - `debug`
 - `error`
 - `warn`
 - `configure`
 - `getRawLogger` (returns the logger passed to `configure`)

As well as:
 - `stream` (an object for passing to `morgan`)

Note that the logger used to configure the module must implement `error`, `warn`, `info` and `debug` functions.


