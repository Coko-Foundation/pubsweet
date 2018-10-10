const { EventEmitter } = require('events')

class SSE extends EventEmitter {
  constructor() {
    super()

    this.connect = this.connect.bind(this)
    this.messageId = 0
  }

  connect(req, res) {
    // if (req.header('Accept').indexOf('text/event-stream') === -1) {
    // TODO: throw exception?
    // }
    this.pulse()

    req.socket.setTimeout(Number.MAX_SAFE_INTEGER)
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)

    res.statusCode = 200

    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // prevent buffering by nginx
    })

    this.setMaxListeners(this.getMaxListeners() + 1)

    const write = (type, data) => {
      res.write(`${type}: ${data}`)
      res.write('\n')
    }

    const writeMessage = message => {
      this.messageId = this.messageId + 1
      write('id', this.messageId)

      if (message.event) {
        write('event', message.event)
      }

      write('data', JSON.stringify(message.data))
      res.write('\n')
    }

    const dataListener = async data => {
      const { action, data: payload } = data.data

      if (data.event === 'pulse' || !this.authsome) {
        return writeMessage(data)
      }

      const permission = await this.authsome.can(req.user, action, payload)

      if (permission.filter) {
        data.data.data = permission.filter(payload)
        return writeMessage(data)
      } else if (permission) {
        return writeMessage(data)
      }
      return undefined
    }

    // TODO: store all updates, use Last-Event-ID to send missed messages on reconnect
    this.on('data', dataListener)

    req.on('close', () => {
      this.removeListener('data', dataListener)
      this.setMaxListeners(this.getMaxListeners() - 1)
      if (this.listenerCount('data') === 0) {
        clearInterval(this.pulseInterval)
        this.pulseInterval = undefined
      }
    })
  }

  pulse() {
    if (this.pulseInterval) return // Already pulsing
    this.pulseInterval = setInterval(() => {
      this.emit('data', { event: 'pulse', data: Date.now() })
    }, 10000)

    this.pulseInterval.unref()
  }

  send(data, event) {
    this.emit('data', { data, event })
  }

  setAuthsome(authsome) {
    this.authsome = authsome
  }
}

module.exports = new SSE()
