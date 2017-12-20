module.exports = {
  username: {
    description: 'Admin username',
  },
  email: {
    description: 'Admin email address',
  },
  password: {
    description: 'Admin password',
    hidden: true,
    replace: '*',
  },
  clobber: {
    type: 'boolean',
    description: 'Overwrite any pre-existing database',
    default: false,
  },
}
