const Replay = require('replay')
const fetchUserDetails = require('./fetchUserDetails')

Replay.fixtures = `${__dirname}/fixtures`

describe('Fetch ORCID author details', () => {
  it('gets user details', async () => {
    const user = {
      orcid: '0000-0003-3146-0256',
      oauth: { accessToken: 'f7617529-f46a-40b1-99f4-4181859783ca' },
    }
    const response = await fetchUserDetails(user)
    expect(response).toEqual({
      firstName: 'Test',
      lastName: 'User',
      email: 'elife@mailinator.com',
      institution: 'University of eLife',
    })
  })
})
