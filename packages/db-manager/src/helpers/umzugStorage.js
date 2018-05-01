const db = require('pubsweet-server/src/db')

// umzug storage adapter
module.exports = {
  async logMigration(id) {
    await db.query('INSERT INTO migrations (id) VALUES ($1)', [id])
  },

  async unlogMigration(id) {
    await db.query('DELETE FROM migrations WHERE id = $1', [id])
  },

  async executed() {
    await db.query(
      `CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        run_at TIMESTAMPTZ DEFAULT current_timestamp
      )`,
    )
    const { rows } = await db.query('SELECT id FROM migrations')
    return rows.map(row => row.id)
  },
}
