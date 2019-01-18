const collection = {
  type: 'collection',
  title: 'Science Blogger posts',
  published: true,
}

const collection2 = {
  type: 'collection',
  title: 'Second collection',
  published: true,
}

const updatedCollection = {
  title: 'Update Blogger posts',
}

const fragment = {
  type: 'fragment',
  fragmentType: 'blogpost',
  title: 'Just your regular blogpost',
  source: '<blog></blog>',
  presentation: '<p></p>',
}

const updatedFragment = {
  fragmentType: 'blogpost',
  source: '<blog><title>Updated</title></blog>',
  presentation: '<p><h1>Updated</h1></p>',
}

const contribTeamType = {
  name: 'Contributors',
  permissions: 'POST',
}

const readerTeamType = {
  name: 'Readers',
  permissions: 'GET',
}

const teams = {
  contributors: contribTeamType,
  readers: readerTeamType,
}

const contributorTeam = {
  type: 'team',
  name: 'My contributors',
  teamType: 'teamContributors',
  object: fragment,
}

const readerTeam = {
  type: 'team',
  name: 'My readers',
  teamType: 'teamReaders',
  object: fragment,
}

module.exports = {
  collection,
  collection2,
  updatedCollection,
  fragment,
  updatedFragment,
  teams,
  contributorTeam,
  readerTeam,
}
