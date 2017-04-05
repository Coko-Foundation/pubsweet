module.exports = {
  username: {
    description: 'Username'
  },
  email: {
    description: 'Email address'
  },
  password: {
    description: 'Password',
    hidden: true,
    replace: '*'
  },
  admin: {
    description: 'Give user admin privileges',
    type: 'boolean',
    default: true
  }
}
