process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const { cloneDeep } = require('lodash')
const htmlTemplateService = require('../src/HTMLTemplateService')

const emailProps = {
  toUserName: 'Peter Griffin',
  paragraph: 'This is a paragraph',
  hasLink: true,
  ctaText: 'CLICK HERE',
  hasIntro: true,
  hasSignature: true,
}

describe('Email template helpers', () => {
  let replacements = {}
  beforeEach(() => {
    replacements = cloneDeep(emailProps)
  })
  it('should return the notification HTML with CTA', () => {
    const notificationBody = htmlTemplateService.getCompiledNotificationBody({
      replacements,
    })

    expect(notificationBody).toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).toContain('CLICK HERE')
    expect(notificationBody).toContain('Dear Dr.')
    expect(notificationBody).toContain('Kind regards')
  })

  it('should return the notification HTML without CTA', () => {
    replacements.hasLink = false
    const notificationBody = htmlTemplateService.getCompiledNotificationBody({
      replacements,
    })
    expect(notificationBody).toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).not.toContain('CLICK HERE')
  })
  it('should return the notification HTML without intro', () => {
    replacements.hasIntro = false
    const notificationBody = htmlTemplateService.getCompiledNotificationBody({
      replacements,
    })
    expect(notificationBody).not.toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).not.toContain('Dear Dr.')
  })
  it('should return the notification HTML without signature', () => {
    replacements.hasSignature = false
    const notificationBody = htmlTemplateService.getCompiledNotificationBody({
      replacements,
    })
    expect(notificationBody).toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).not.toContain('Kind regards')
  })
})
