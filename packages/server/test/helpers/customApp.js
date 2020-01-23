const configureApp = app => {
  app.get('/verify', (req, res) => res.send('hi'))

  // Actions to perform when the HTTP server starts listening
  app.onListen = async server => {
    // No-op
  }

  // Actions to perform when the server closes
  app.onClose = async () => {
    // No-op
  }

  return app
}

module.exports = configureApp
