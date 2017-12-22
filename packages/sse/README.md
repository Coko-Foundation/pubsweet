# pubsweet-sse

Broadcast server-sent events to connected Express clients.

## Install

```
npm install pubsweet-sse
```

or

```
yarn install pubsweet-sse
```

## Example usage in Express

```js
const sse = require('pubsweet-sse')

// set the /updates route for authenticated clients to connect using EventSource
app.get('/updates', passport.authenticate('bearer'), sse.connect)

// broadcast data to all connected clients
sse.send({ foo: 'bar' })
```

## Alternatives

This module was originally adapted from [express-sse](https://github.com/dpskvn/express-sse)
