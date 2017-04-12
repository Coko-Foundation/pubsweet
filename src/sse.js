// adapted from https://github.com/dpskvn/express-sse (MIT)

const EventEmitter = require('events').EventEmitter

class SSE extends EventEmitter {
  constructor () {
    super()

    this.connect = this.connect.bind(this)
    this.messageId = 0
    this.pulse()
  }

  connect (req, res) {
    if (req.header('Accept').indexOf('text/event-stream') === -1) {
      // TODO: throw exception?
    }

    req.socket.setTimeout(Number.MAX_SAFE_INTEGER)
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)

    res.statusCode = 200

    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })

    this.setMaxListeners(this.getMaxListeners() + 1)

    const dataListener = data => {
      res.write(`id: ${this.messageId++}\n`)

      if (data.event) {
        res.write(`event: ${data.event}\n`)
      }

      res.write(`data: ${JSON.stringify(data.data)}\n\n`)
    }

    // TODO: store all updates, use Last-Event-ID to send missed messages on reconnect

    this.on('data', dataListener)

    req.on('close', () => {
      this.removeListener('data', dataListener)
      this.setMaxListeners(this.getMaxListeners() - 1)
    })
  }

  pulse () {
    setInterval(() => {
      this.emit('data', { event: 'pulse', data: Date.now() })
    }, 10000)
  }

  send (data, event) {
    this.emit('data', { data, event })
  }
}

module.exports = new SSE()
