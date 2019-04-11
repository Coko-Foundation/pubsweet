const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      database: global.__testDbName || 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    baseUrl: 'http://example.com',
  },
  authsome: {
    mode: path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'server',
      'model-team',
      'test',
      'helpers',
      'authsome_mode',
    ),
  },
  mailer: {
    from: 'nobody@example.com',
  },
}
