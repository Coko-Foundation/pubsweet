const users = require('./users')

module.exports = {
  teamType: {
    name: 'editorInChief',
    permissions: 'editor',
  },
  group: 'editor',
  name: 'Editor in Chief',
  object: {
    type: 'collection',
    id: '123',
  },
  members: [users.editorInChief.id],
}
