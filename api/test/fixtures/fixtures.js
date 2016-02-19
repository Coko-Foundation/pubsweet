const collection = {
  'type': 'collection',
  'title': 'Science Blogger posts'
}

const updatedCollection = {
  'title': 'Update Blogger posts'
}

const fragment = {
  'kind': 'blogpost',
  'source': '<blog></blog>',
  'presentation': '<p></p>'
}

const updatedFragment = {
  'kind': 'blogpost',
  'source': '<blog><title>Updated</title></blog>',
  'presentation': '<p><h1>Updated</h1></p>'
}

const user = {
  'type': 'user',
  'username': 'testuser',
  'email': 'test@example.com',
  'password': 'test'
}

const updatedUser = {
  'username': 'changeduser',
  'email': 'changed@email.com',
  'password': 'changed'
}

const otherUser = {
  'type': 'user',
  'username': 'anotheruser',
  'email': 'another@com.nz',
  'password': 'rubgy'
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
  otherUser: otherUser,
  role: role,
  userRole: userRole
}

