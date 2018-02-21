const users = {
  admin: {
    type: 'user',
    username: 'admin',
    email: 'admin@example.com',
    password: 'test',
    admin: true,
    id: 'admin123',
  },
  editorInChief: {
    type: 'user',
    username: 'editor',
    email: 'editor@example.com',
    password: 'test1234',
    admin: false,
    id: 'editor123',
    roles: ['editorInChief'],
    passwordResetToken: 'token123',
    firstName: 'vlad',
    lastName: 'dracul',
    affiliation: 'MIT',
    title: 'prof',
    save: jest.fn(() => users.editorInChief),
    isConfirmed: false,
  },
  handlingEditor: {
    type: 'user',
    username: 'handling',
    email: 'handling@example.com',
    password: 'test',
    admin: false,
    id: 'handling123',
    roles: ['handlingEditor'],
  },
}

module.exports = users
