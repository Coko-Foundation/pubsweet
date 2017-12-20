global.db = require('../db')()

module.exports = () => {
  if (!db.rel) {
    return db.setSchema([
      {
        singular: 'collection',
        plural: 'collections',
        relations: {
          fragments: { hasMany: 'fragment' },
          owners: { hasMany: 'user' },
        },
      },
      {
        singular: 'fragment',
        plural: 'fragments',
        relations: {
          collection: { belongsTo: 'collection' },
          owners: { hasMany: 'user' },
        },
      },
      {
        singular: 'user',
        plural: 'users',
        relations: {
          collections: { hasMany: 'collection' },
          fragments: { hasMany: 'fragment' },
          teams: { hasMany: 'team' },
        },
      },
      {
        singular: 'team',
        plural: 'teams',
        relations: {
          members: { hasMany: 'user' },
        },
      },
    ])
  }
}
