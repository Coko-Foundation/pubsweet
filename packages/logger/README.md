# @pubsweet/logger

A module encapsulating standard logging features for pubsweet components and services.

## Usage

Either:

```javascript
const myLogger = require('winston') // or something else
const logger = require('@pubsweet/logger')
logger.configure(myLogger)
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
