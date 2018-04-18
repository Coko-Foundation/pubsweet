const { EventEmitter } = require('events')

class SSE extends EventEmitter {
  constructor() {
    super()

    this.connect = this.connect.bind(this)
    this.messageId = 0
    this.user = ''
    // only to pass linting
    this.models = {}
    this.pulse()
  }

  connect(req, res) {
    // if (req.header('Accept').indexOf('text/event-stream') === -1) {
    // TODO: throw exception?
    // }

    req.socket.setTimeout(Number.MAX_SAFE_INTEGER)
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)
    // TODO: how to access models here
    this.user = this.models.User.find(req.user)

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

      if (this.shouldBroadcast(data.data)) {
        write('data', JSON.stringify(data.data))
      }
      res.write('\n')
    }

    // TODO: store all updates, use Last-Event-ID to send missed messages on reconnect

    this.on('data', dataListener)

    req.on('close', () => {
      this.removeListener('data', dataListener)
      this.setMaxListeners(this.getMaxListeners() - 1)
    })
  }

  async shouldBroadcast(data) {
    // TODO: if the data is about fragment then use the collection's id first
    const memberships = await Promise.all(
      this.user.teams.map(async teamId => {
        // TODO: how to access models here???
        const teamFound = await this.models.Team.find(teamId)
        return teamFound.object.id === data.id
      }),
    )
    return memberships.includes(true)
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
}

module.exports = new SSE()
