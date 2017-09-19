describe('add-user', () => {
  it('adds a regular user to the database', async () => {
    await require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.regularuser
    })

    // const user = await User.findOneByField('username', fixtures.regularuser.username)
    const users = await User.all()
    const user = users.find(user => user.username === fixtures.regularuser.username)

    expect(user).not.toBeNull()
    expect(user.email).toBe(fixtures.regularuser.email)
    expect(user.admin).toBe(false)
  })

  it('adds an admin user to the database', async () => {
    await require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.adminuser
    })

    // const user = await User.findOneByField('username', fixtures.adminuser.username)
    const users = await User.all()
    const user = users.find(user => user.username === fixtures.adminuser.username)

    expect(user).not.toBeNull()
    expect(user.email).toBe(fixtures.adminuser.email)
    expect(user.admin).toBe(true)
  })
})
