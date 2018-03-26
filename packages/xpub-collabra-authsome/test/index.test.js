const Authsome = require('authsome')

const authsomeConfig = require('./teams-config.js')

const collections = [
  {
    id: 'collection1',
  },
  {
    id: 'collection2',
  },
]

const teams = [
  {
    id: 'team1',
    teamType: 'handlingEditor',
    object: {
      id: 'collection2',
      type: 'collection',
    },
  },
  {
    id: 'team2',
    teamType: 'seniorEditor',
    object: {
      id: 'collection1',
      type: 'collection',
    },
  },
  {
    id: 'team3',
    teamType: 'managingEditor',
    // No associated object means this is a global team
  },
]

const users = [
  {
    id: 'user1',
    username: 'handlingEditor1',
    teams: ['team1'],
  },
  {
    id: 'user2',
    username: 'seniorEditor1',
    teams: ['team2'],
  },
  {
    id: 'user3',
    username: 'managingEditor1',
    teams: ['team3'],
  },
  {
    id: 'adminId',
    username: 'admin',
    admin: true,
  },
]

const authsome = new Authsome(
  { mode: require('../src/index'), ...authsomeConfig },
  {
    models: {
      User: { find: id => users.find(user => user.id === id) },
      Team: { find: id => teams.find(team => team.id === id) },
    },
  },
)

describe('admin', () => {
  it('allows everything to an admin', async () => {
    const permission = await authsome.can(
      'adminId',
      'DELETE',
      'thisSensitiveThing',
    )
    expect(permission).toBe(true)
  })
})

describe('Handling Editor', () => {
  it('lists only collections where user is a member of the handling editors team', async () => {
    const permission = await authsome.can('user1', 'GET', {
      path: '/collections',
    })
    const filteredCollections = await permission.filter(collections)
    expect(filteredCollections).toEqual([collections[1]])
  })
})

describe('Senior Editor', () => {
  it('lists only collections where user is a member of the senior editors team', async () => {
    const permission = await authsome.can('user2', 'GET', {
      path: '/collections',
    })
    const filteredCollections = await permission.filter(collections)
    expect(filteredCollections).toEqual([collections[0]])
  })
})

describe('Managing Editor', () => {
  it('can list all collections', async () => {
    const permission = await authsome.can('user3', 'GET', {
      path: '/collections',
    })
    expect(permission).toBe(true)
  })
})