module.exports = {
  'pubsweet-server': {
    db: {
      // temporary database name set by jest-environment-db
      database: global.__testDbName || 'test',
    },
    ignoreTerminatedConnectionError: true,
    secret: 'test',
    logger: {
      error: () => false,
      warn: () => false,
      info: () => false,
      debug: () => false,
    },
  },
  dbManager: {
    username: 'testUsername',
    email: 'test@example.com',
    password: 'test_password',
    clobber: true,
  },
}
