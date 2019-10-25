const logger = require('@pubsweet/logger')
const db = require('../db')

// umzug storage adapter
module.exports = {
  async logMigration(id) {
    await db.raw('INSERT INTO migrations (id) VALUES (?)', [id])
    logger.info(`Successfully ran migration ${id}`)
  },

  async unlogMigration(id) {
    await db.raw('DELETE FROM migrations WHERE id = ?', [id])
    logger.info(`Successfully removed migration ${id}`)
  },

  async executed() {
    await db.raw(
      `CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        run_at TIMESTAMPTZ DEFAULT current_timestamp
      )`,
    )
    const { rows } = await db.raw('SELECT id FROM migrations')
    return rows.map(row => row.id)
  },
}
