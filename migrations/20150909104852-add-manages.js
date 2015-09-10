const dbm = global.dbm || require('db-migrate');

exports.up = function(db, callback) {
  db.createTable('manages', {
    id: { type: 'serial', primaryKey: true },
    data: 'jsonb',
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('manages', callback);
};
