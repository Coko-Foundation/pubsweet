var pg = require('pg');
var connectionString = process.env.DATABASE_URL;
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('postgresql');

before(function(done) {
  pg.connect(connectionString, function(err, client, done) {
    databaseCleaner.clean(client, function() {
      console.log('Database cleaned.');
      done();
    });
  });
  done()
})
