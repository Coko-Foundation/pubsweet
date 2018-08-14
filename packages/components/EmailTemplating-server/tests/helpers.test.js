process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const helpers = require('../src/helpers')

const replacements = {
  toUserName: 'Peter Griffin',
  paragraph: 'This is a paragraph',
  hasLink: true,
  ctaText: 'CLICK HERE',
}

describe('Email template helpers', () => {
  it('should return the notification HTML with CTA', () => {
    const notificationBody = helpers.getNotificationBody({ replacements })

    expect(notificationBody).toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).toContain('CLICK HERE')
  })

  it('should return the notification HTML without CTA', () => {
    replacements.hasLink = false
    const notificationBody = helpers.getNotificationBody({ replacements })
    expect(notificationBody).toContain('Peter Griffin')
    expect(notificationBody).toContain('This is a paragraph')
    expect(notificationBody).not.toContain('CLICK HERE')
  })
})
