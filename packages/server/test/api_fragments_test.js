const STATUS = require('http-status-codes')

const { model: User } = require('@pubsweet/model-user')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const api = require('./helpers/api')

const authenticateAdmin = () => api.users.authenticate.post(fixtures.adminUser)

describe('Fragments API', () => {
  beforeEach(() =>
    cleanDB().then(() =>
      Promise.all([
        new User(fixtures.adminUser).save(),
        new User(fixtures.user).save(),
      ]),
    ),
  )

  describe('admin', () => {
    it('should have an initially empty list of fragments', async () => {
      const adminToken = await authenticateAdmin()

      // list all the collections
      const collections = await api.fragments
        .get({ token: adminToken })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toEqual([])
    })

    it('should allow an admin user to create a fragment', async () => {
      const adminToken = await authenticateAdmin()

      const fragment = await api.fragments
        .post({
          fragment: { ...fixtures.fragment, filtered: 'example' },
          token: adminToken,
        })
        .expect(STATUS.CREATED)
        .then(res => res.body)

      expect(fragment.type).toEqual(fixtures.fragment.type)
      expect(fragment.title).toEqual(fixtures.fragment.title)
      expect(fragment.filtered).toEqual('example')
    })

    it('should allow an admin user to update a fragment (without filtering properties)', async () => {
      const adminToken = await authenticateAdmin()

      const fragment = await api.fragments
        .post({
          fragment: fixtures.fragment,
          token: adminToken,
        })
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // update the collection
      const title = 'Updated title'
      const filtered = 'example'

      const result = await api.fragments
        .patch({
          fragmentId: fragment.id,
          update: { title, filtered, rev: fragment.rev },
          token: adminToken,
        })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.title).toEqual(title)
      expect(result.filtered).toEqual('example')
    })

    it('should allow an admin user to delete a fragment', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const fragment = await api.fragments
        .post({
          fragment: fixtures.fragment,
          token: adminToken,
        })
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // delete the collection
      await api.fragments
        .delete({
          fragmentId: fragment.id,
          token: adminToken,
        })
        .expect(STATUS.OK)

      // try to retrieve the deleted collection
      await api.fragments
        .get({
          fragmentId: fragment.id,
          token: adminToken,
        })
        .expect(STATUS.NOT_FOUND)
    })

    it('should allow an admin user to retrieve only some fields when getting fragments', async () => {
      const adminToken = await authenticateAdmin()

      await api.fragments
        .post({
          fragment: fixtures.fragment,
          token: adminToken,
        })
        .expect(STATUS.CREATED)

      const fragments = await api.fragments
        .get({
          token: adminToken,
        })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragments).toHaveLength(1)

      const fragment = fragments[0]

      expect(fragment).toHaveProperty('id') // the ID field must always be present
      expect(fragment).toHaveProperty('type')
      expect(fragment).toHaveProperty('presentation')
      expect(fragment).toHaveProperty('source')

      // list fragments in this collection, requesting only certain fields
      const filteredFragments = await api.fragments
        .get({
          token: adminToken,
          fields: ['type', 'presentation'],
        })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(filteredFragments).toHaveLength(1)

      const filteredFragment = filteredFragments[0]

      expect(filteredFragment).toHaveProperty('id') // the ID field must always be present
      expect(filteredFragment).toHaveProperty('type')
      expect(filteredFragment).toHaveProperty('presentation')
      expect(filteredFragment).not.toHaveProperty('source')
    })

    it('should allow admin to retrieve teams for a fragment', async () => {
      const token = await authenticateAdmin()

      const fragment = await api.fragments
        .post({
          fragment: fixtures.fragment,
          token,
        })
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create the teams
      const teamFixture = Object.assign({}, fixtures.contributorTeam, {
        object: { type: 'fragment', id: fragment.id },
      })
      await api.teams.post(teamFixture, token)

      // retrieve the fragment team(s)
      const teams = await api.fragments
        .teams({
          fragmentId: fragment.id,
          token,
        })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teams).toHaveLength(1)
      expect(teams[0]).toMatchObject({
        name: 'My contributors',
        object: {
          type: 'fragment',
        },
      })
    })
  })
})
