process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment"
  ]
}}`

const Team = require('../src/team')
const TeamMember = require('../src/team_member')
const { User } = require('@pubsweet/models')
const { dbCleaner } = require('pubsweet-server/test')

const createTeamWithMember = async () => {
  const user = await new User({
    email: 'some@example.com',
    username: 'test',
  }).save()

  const team = await Team.query().upsertGraphAndFetch(
    {
      name: 'Test',
      role: 'testRole',
      members: [{ user: { id: user.id } }],
    },
    { relate: true },
  )

  return { user, team }
}

describe('Team', () => {
  beforeEach(async () => {
    await dbCleaner()
  })

  it('has updated set when created', async () => {
    const team = await new Team({
      name: 'Test',
      role: 'globalSeniorEditor',
    }).save()
    expect(team.role).toEqual('globalSeniorEditor')
    const now = new Date().toISOString()
    expect(team.updated.toISOString()).toHaveLength(now.length)
  })

  it('can be saved and found and deleted', async () => {
    const team = await new Team({ name: 'Test', role: 'testRole' }).save()
    expect(team.name).toEqual('Test')

    const foundTeam = await Team.find(team.id)
    expect(foundTeam.name).toEqual('Test')

    await foundTeam.delete()

    async function tryToFind() {
      await Team.find(foundTeam.id)
    }
    await expect(tryToFind()).rejects.toThrow('Object not found')
  })

  it('can have some members', async () => {
    const newTeam = (await createTeamWithMember()).team
    const team = await Team.query()
      .findById(newTeam.id)
      .withGraphFetched('members')

    expect(team.members).toHaveLength(1)
  })

  it('deletes memberships after team is deleted', async () => {
    const { team, user } = await createTeamWithMember()

    let foundUser = await User.query()
      .findById(user.id)
      .withGraphFetched('teams')

    expect(foundUser.teams).toHaveLength(1)

    await Team.query().deleteById(team.id)

    foundUser = await User.query()
      .findById(user.id)
      .withGraphFetched('teams')

    expect(foundUser.teams).toHaveLength(0)
  })

  it('creates team and related objects with one call', async () => {
    const user = await new User({
      email: 'some@example.com',
      username: 'test',
    }).save()

    const team = await Team.query().upsertGraphAndFetch(
      {
        role: 'test',
        name: 'My team',
        objectId: '5989b23c-356b-4ae9-bee5-bbd11f29028b',
        objectType: 'fragment',
        members: [
          {
            user: { id: user.id },
            alias: {
              email: 'someemail',
              aff: 'someaff',
              name: 'somename',
            },
            status: 'invited',
          },
        ],
      },
      {
        relate: true,
        unrelate: true,
      },
    )

    expect(team.members).toHaveLength(1)
    expect(team.members[0].id).toBeDefined()
    expect(team.members[0].alias.id).toBeDefined()
    expect(team.members[0].user.id).toBe(user.id)

    const userWithTeams = await User.query()
      .findById(user.id)
      .withGraphFetched('teams')
    expect(userWithTeams.teams[0].id).toBe(team.id)
  })

  // This can be the case if you add a team member who is
  // not yet a user of the system (we keep track using aliases)
  it('creates a team member without a user', async () => {
    const team = await Team.query().upsertGraphAndFetch(
      {
        name: 'Test',
        role: 'testRole',
        members: [
          { alias: { aff: 'Test University', email: 'test@example.com' } },
        ],
      },
      { relate: true },
    )

    expect(team.members[0].user).not.toBeDefined()
  })

  it('can not create a team member without a team', async () => {
    const { user } = await createTeamWithMember()

    await expect(
      TeamMember.query().insert({
        userId: user.id,
      }),
    ).rejects.toThrow('violates not-null constraint')
  })
})
