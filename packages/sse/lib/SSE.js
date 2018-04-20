const { EventEmitter } = require('events')

class SSE extends EventEmitter {
  constructor() {
    super()

    this.connect = this.connect.bind(this)
    this.messageId = 0
    this.userId = ''
    this.eventFilter = null
    this.pulse()
  }

  connect(req, res) {
    // if (req.header('Accept').indexOf('text/event-stream') === -1) {
    // TODO: throw exception?
    // }

    this.userId = req.user

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

    const dataListener = data => {
      this.messageId = this.messageId + 1
      write('id', this.messageId)

      if (data.event) {
        write('event', data.event)
      }

      write('data', JSON.stringify(data.data))
      res.write('\n')
    }

    // TODO: store all updates, use Last-Event-ID to send missed messages on reconnect

    this.on('data', async data => {
      const { action, data: payload } = data.data
      if (data.event) dataListener(data)
      if (this.eventFilter !== null && action) {
        const shouldBroadcast = await this.eventFilter.can(
          this.userId,
          action,
          payload,
        )

        if (shouldBroadcast) {
          dataListener(data)
        }
      }
    })

    req.on('close', () => {
      this.removeListener('data', dataListener)
      this.setMaxListeners(this.getMaxListeners() - 1)
    })
  }

  pulse() {
    const pulseInterval = setInterval(() => {
      this.emit('data', { event: 'pulse', data: Date.now() })
    }, 10000)

    pulseInterval.unref()
  }

  send(data, event) {
    this.emit('data', { data, event })
  }

  setContext(context) {
    this.eventFilter = context
  }
}

module.exports = new SSE()
