module.exports = {
  'pubsweet-server': {
    secret: 'test',
    dbPath: 'dummy value for validation',
    adapter: 'memory',
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
  },
}
