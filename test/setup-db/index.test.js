describe('setup-db', () => {
  it('creates the database', async () => {
    await expect(fs.readdir(dbdir)).resolves.toContain('production')

    const items = await fs.readdir(path.join(dbdir, 'production'))

    expect(items).toContain('CURRENT')
    expect(items).toContain('LOG')
    expect(items).toContain('LOCK')
  })

  it('only creates the database for the current NODE_ENV', async () => {
    const items = await fs.readdir(path.join(dbdir, 'dev'))

    expect(items).not.toContain('CURRENT')
  })
})

