const collection = {
  'type': 'collection',
  'title': 'Science Blogger posts'
}

const updatedCollection = {
  'title': 'Update Blogger posts'
}

const fragment = {
  'type': 'blogpost',
  'source': '<blog></blog>',
  'presentation': '<p></p>'
}

const updatedFragment = {
  'source': '<blog><title>Updated</title></blog>',
  'presentation': '<p><h1>Updated</h1></p>'
}

const user = {
  'type': 'user',
  'name': 'testuser',
  'email': 'test@example.com',
  'password': 'test'
}

const updatedUser = {
  'name': 'changeduser',
  'email': 'changed@email.com',
  'password': 'changed'
}

const userRole = {
  'user': user.name,
  'role': 'sysadmin'
}

const role = {
  'role': 'sysadmin',
  'resource': 'fill in with e.g. collection id',
  'permissions': '*'
}

module.exports = {
  collection: collection,
  updatedCollection: updatedCollection,
  fragment: fragment,
  updatedFragment: updatedFragment,
  user: user,
  updatedUser: updatedUser,
  role: role,
  userRole: userRole
}

