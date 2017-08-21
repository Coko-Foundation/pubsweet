global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}

const logger = require('../src')

describe('Logging manager', () => {
  describe('when no logger is specifed', () => {
    beforeEach(() => {
      global.console.log.mockClear()
      global.console.warn.mockClear()
      global.console.info.mockClear()
      global.console.error.mockClear()
    })

    it('logs errors to console', () => {
      logger.error('an error message')
      expect(console.error).toHaveBeenCalled()
    })

    it('logs warn to console', () => {
      logger.warn('an warn message')
      expect(console.warn).toHaveBeenCalled()
    })

    it('logs info to console', () => {
      logger.info('an info message')
      expect(console.info).toHaveBeenCalled()
    })

    it('logs debug to console', () => {
      logger.debug('an debug message')
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('when passed another logger', () => {
    it('throws an error if a required method is not implemented', () => {
      expect(() => {
        logger.configure({})
      }).toThrow('Logger must implement "error", "warn", "info" and "debug" functions')
    })

    it('works with winston', () => {
      const winston = require('winston')
      winston.debug = jest.fn()
      logger.configure(winston)
      logger.debug('something')
      expect(winston.debug).toHaveBeenCalled()
    })
  })
})
