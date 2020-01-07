const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      database: 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    port: 4000,
    secret: 'test',
  },
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-team',
      path.join(__dirname, '../src'),
    ],
  },
  authsome: {
    mode: 'pubsweet-server/test/helpers/authsome_mode',
  },
}
