module.exports = {
  'pubsweet-server': {
    db: {
      database: global.__testDbName || 'test',
    },
    secret: 'not very secret',
  },
}
