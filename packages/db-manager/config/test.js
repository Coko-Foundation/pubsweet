module.exports = {
  'pubsweet-server': {
    db: {
      // temporary database name set by jest-environment-db
      database: global.__testDbName || 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
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
    migrationsPath: `${__dirname}/../test/migrations`,
    username: 'testUsername',
    email: 'test@example.com',
    password: 'test_password',
  },
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-team',
      '@pubsweet/model-fragment',
      '@pubsweet/model-collection',
    ],
  },
}
