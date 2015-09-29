var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('creates', {
    id: { type: 'serial', primaryKey: true },
    data: 'jsonb'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('creates', callback);
};
