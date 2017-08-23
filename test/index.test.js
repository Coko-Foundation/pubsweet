'use strict'

process.env.ALLOW_CONFIG_MUTATIONS = true
process.env.SUPPRESS_NO_CONFIG_WARNING = true

let config = require('config')
config['pubsweet-server'] = { }

describe('Logging manager', () => {
  describe('when no logger is specifed', () => {
    it('logs errors to console', () => {
      jest.spyOn(global.console, 'error').mockImplementation()
      const logger = require('../src/')
      logger.error('an error message')
      expect(console.error).toHaveBeenCalled()
      console.error.mockRestore()
    })

    it('logs warn to console', () => {
      jest.spyOn(global.console, 'warn').mockImplementation()
      const logger = require('../src/')
      logger.warn('a warn message')
      expect(console.warn).toHaveBeenCalled()
      console.warn.mockRestore()
    })

    it('logs info to console', () => {
      jest.spyOn(global.console, 'info').mockImplementation()
      const logger = require('../src/')
      logger.info('an info message')
      expect(console.info).toHaveBeenCalled()
      console.info.mockRestore()
    })

    it('logs debug to console', () => {
      jest.spyOn(global.console, 'log').mockImplementation()
      const logger = require('../src/')
      logger.debug('a debug message')
      expect(console.log).toHaveBeenCalled()
      console.log.mockRestore()
    })

    it('can stream logs to console', () => {
      jest.spyOn(global.console, 'info').mockImplementation()
      const logger = require('../src')
      logger.stream.write('a stream message')
      expect(console.info).toHaveBeenCalled()
      console.info.mockRestore()
    })
  })

  describe('when configure method is passed another logger', () => {
    it('throws an error if a required method is not implemented', () => {
      const logger = require('../src/')
      expect.hasAssertions()

      // https://github.com/facebook/jest/issues/2124
      try {
        logger.configure({})
      } catch (e) {
        expect(e.name).toBe('ValidationError')
      }
    })

    it('works with winston', () => {
      const logger = require('../src/')
      const winston = require('winston')
      jest.spyOn(winston, 'debug').mockImplementation()
      jest.spyOn(winston, 'info').mockImplementation()
      jest.spyOn(winston, 'warn').mockImplementation()
      jest.spyOn(winston, 'error').mockImplementation()
      logger.configure(winston)

      logger.debug('debug')
      expect(winston.debug).toHaveBeenLastCalledWith('debug')
      logger.info('info')
      expect(winston.info).toHaveBeenLastCalledWith('info')
      logger.warn('warn')
      expect(winston.warn).toHaveBeenLastCalledWith('warn')
      logger.error('error')
      expect(winston.error).toHaveBeenLastCalledWith('error')
    })

    it('works with bunyan', () => {
      jest.resetModules()
      config = require('config')
      const logger = require('../src/')
      const bunyan = require('bunyan').createLogger({name: 'test'})
      jest.spyOn(bunyan, 'debug').mockImplementation()
      jest.spyOn(bunyan, 'info').mockImplementation()
      jest.spyOn(bunyan, 'warn').mockImplementation()
      jest.spyOn(bunyan, 'error').mockImplementation()
      logger.configure(bunyan)

      logger.debug('debug')
      expect(bunyan.debug).toHaveBeenLastCalledWith('debug')
      logger.info('info')
      expect(bunyan.info).toHaveBeenLastCalledWith('info')
      logger.warn('warn')
      expect(bunyan.warn).toHaveBeenLastCalledWith('warn')
      logger.error('error')
      expect(bunyan.error).toHaveBeenLastCalledWith('error')
    })

    it('prevents configuration again', () => {
      jest.resetModules()
      config = require('config')
      const logger = require('../src/')
      const winston = require('winston')
      logger.configure(winston)
      expect(() => logger.configure(winston)).toThrow(/already been configured/)
    })
  })

  describe('has getRawLogger method', () => {
    it('which returns raw logger', () => {
      jest.resetModules()
      const logger = require('../src/')
      const bunyan = require('bunyan').createLogger({name: 'test'})
      logger.configure(bunyan)
      const rawLogger = logger.getRawLogger()
      expect(rawLogger.fields.name).toBe('test')
    })
  })

  describe('when a logger is passed by config', () => {
    it('sets logger to "bunyan" if specified', () => {
      jest.resetModules()
      config = require('config')
      const bunyan = require('bunyan').createLogger({name: 'test'})
      config['pubsweet-server'] = { logger: bunyan }
      const logger = require('../src/')
      const rawLogger = logger.getRawLogger()
      expect(rawLogger.fields.name).toBe('test')
    })

    it('sets logger to "winston" if specified', () => {
      jest.resetModules()
      config = require('config')
      const winston = require('winston')
      config['pubsweet-server'] = { logger: winston }
      const logger = require('../src/')
      const rawLogger = logger.getRawLogger()
      expect(rawLogger).toEqual(require('winston'))
    })

    it('defaults to console', () => {
      jest.resetModules()
      config = require('config')
      config['pubsweet-server'] = {}
      const logger = require('../src/')
      const rawLogger = logger.getRawLogger()
      expect(rawLogger).toEqual(global.console)
    })

    it('logger passed must be an object', () => {
      jest.resetModules()
      config = require('config')
      config['pubsweet-server'] = { logger: 'wiiiiiiiiinston' }
      expect.hasAssertions()

      try {
        require('../src/')
      } catch (e) {
        expect(e.name).toBe('ValidationError')
      }
    })

    it('prevents configuration again', () => {
      jest.resetModules()
      config = require('config')
      const winston = require('winston')
      config['pubsweet-server'] = { logger: winston }
      const logger = require('../src/')
      expect(() => logger.configure(winston)).toThrow(/already been configured/)
    })
  })
})
