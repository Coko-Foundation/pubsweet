const collection = {
  'type': 'collection',
  'title': 'Science Blogger posts',
  'published': true
}

const collection2 = {
  'type': 'collection',
  'title': 'Second collection',
  'published': true
}

const updatedCollection = {
  'title': 'Update Blogger posts'
}

const fragment = {
  'type': 'fragment',
  'fragmentType': 'blogpost',
  'title': 'Just your regular blogpost',
  'source': '<blog></blog>',
  'presentation': '<p></p>'
}

const updatedFragment = {
  'fragmentType': 'blogpost',
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

const adminUser = {
  'type': 'user',
  'username': 'admin',
  'email': 'admin@admins.example.org',
  'password': 'admin',
  'admin': true
}

const contribTeamType = {
  name: 'Contributors',
  permissions: 'POST'
}

const readerTeamType = {
  name: 'Readers',
  permissions: 'GET'
}

const teams = {
  contributors: contribTeamType,
  readers: readerTeamType
}

const contributorTeam = {
  type: 'team',
  name: 'My contributors',
  teamType: teams.contributors,
  object: fragment
}

const readerTeam = {
  type: 'team',
  name: 'My readers',
  teamType: teams.readers,
  object: fragment
}

module.exports = {
  collection: collection,
  collection2,
  updatedCollection: updatedCollection,
  fragment: fragment,
  updatedFragment: updatedFragment,
  user: user,
  updatedUser: updatedUser,
  otherUser: otherUser,
  adminUser: adminUser,
  teams: teams,
  contributorTeam: contributorTeam,
  readerTeam: readerTeam
}