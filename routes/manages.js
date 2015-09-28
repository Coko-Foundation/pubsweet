const express = require('express')
const router = express.Router()
const pg = require('pg')
const connectionString = process.env.DATABASE_URL

// POST (create)
router.post('/', function(req, res) {
  // Grab data from http request
  const data = req.body.data

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Insert a manage
    client.query('INSERT INTO manages(data) values($1) RETURNING id, data', [data],
      function(err, result) {
        if (err) {
          console.log(err)
        } else {
          done()
          return res.status(201).json(result.rows[0])
        }
      })

    // Handle Errors
    if (err) {
      console.log(err)
    }
  })
})

// GET (index)
router.get('/', function(req, res) {
  const results = []

  pg.connect(connectionString, function(err, client, done) {
    const query = client.query('SELECT * FROM manages ORDER BY id ASC')

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row)
    })

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done()
      return res.json(results)
    })

    if (err) {
      console.log(err)
    }
  })
})

// GET (show)
router.get('/:manageId', function(req, res) {
  const id = req.params.manageId

  pg.connect(connectionString, function(err, client, done) {
    client.query('SELECT * FROM manages WHERE id = ($1)', [id],
      function(err, result) {
        done()
        if (err) {
          return console.error(err)
        }
        return res.json(result.rows[0])
      })

    if (err) {
      console.error(err)
    }
  })
})

// PUT (update)
router.put('/:manageId', function(req, res) {
  const id = req.params.manageId
  const data = req.body.data

  pg.connect(connectionString, function(err, client, done) {
    client.query('UPDATE manages SET data=($1) WHERE id=($2) RETURNING id, data',
      [data, id],
      function(err, result) {
        done()
        if (err) {
          return console.error(err)
        }
        return res.json(result.rows[0])
      }
    )

    // Handle Errors
    if (err) {
      console.log(err)
    }
  })
})

// DELETE (...)

router.delete('/:manageId', function(req, res) {
  const id = req.params.manageId

  pg.connect(connectionString, function(err, client, done) {
    client.query('DELETE FROM manages WHERE id=($1)', [id],
      function(err) {
        done()
        if (err) {
          return console.error(err)
        }
        return res.sendStatus(200)
      })

    // Handle Errors
    if (err) {
      console.error(err)
    }
  })
})

module.exports = router
