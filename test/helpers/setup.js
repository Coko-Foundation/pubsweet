#! /usr/bin/env node

const path = require('path')

const childenv = Object.create(process.env)
childenv.NODE_ENV = 'production'

try {
  const child = require('child_process').spawn(
    'node', [path.join(__dirname, 'mockapp.js')],
    {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: childenv
    }
  )

  child.stdout.on('data', data => {
    const msg = data.toString('utf8')
    if (msg.trim() === 'PARENT SHOULD DETACH') {
      console.log('Pubsweet app is running')
      child.unref()
      process.exit(0)
    }
  })
} catch (err) {
  console.log('ERROR:', err.message)
  console.log('TRACE:', err.stack)
}
