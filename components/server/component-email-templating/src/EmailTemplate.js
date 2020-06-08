const config = require('config')
const htmlTemplateService = require('./HTMLTemplateService')
const SendEmail = require('@pubsweet/component-send-email')
const logger = require('@pubsweet/logger')

const configData = {
  logo: config.get('journal.logo'),
  address: config.get('journal.address'),
  privacy: config.get('journal.privacy'),
  ctaColor: config.get('journal.ctaColor'),
  logoLink: config.get('journal.logoLink'),
  publisher: config.get('journal.publisher'),
  footerText: config.get('journal.footerText'),
}
class EmailTemplate {
  constructor({
    type = 'system',
    templateType = 'notification',
    fromEmail = config.get('journal.staffEmail'),
    toUser = {
      id: '',
      email: '',
      name: '',
    },
    cc = [],
    bcc = [],
    content = {
      subject: '',
      ctaLink: '',
      ctaText: '',
      paragraph: '',
      signatureName: '',
      unsubscribeLink: '',
      signatureJournal: '',
    },
    bodyProps = { hasLink: false, hasIntro: false, hasSignature: false },
  }) {
    this.type = type
    this.toUser = toUser
    this.content = content
    this.bodyProps = bodyProps
    this.fromEmail = fromEmail
    this.templateType = templateType
    this.cc = typeof cc === 'string' ? [cc] : cc
    this.bcc = typeof cc === 'string' ? [bcc] : bcc
  }

  set _toUser(newToUser) {
    this.toUser = newToUser
  }

  set _subject(newSubject) {
    this.subject = newSubject
  }

  set _content(newContent) {
    this.content = newContent
  }

  _getInvitationBody() {
    return {
      html: htmlTemplateService.getCompiledInvitationBody({
        replacements: {
          ...configData,
          ...this.content,
          ...this.bodyProps,
          toEmail: this.toUser.email,
          toUserName: this.toUser.name,
        },
      }),
      text: `${this.bodyProps.resend} ${this.bodyProps.upperContent} ${this.bodyProps.manuscriptText} ${this.bodyProps.lowerContent} ${this.content.signatureName}`,
    }
  }

  _getNotificationBody() {
    return {
      html: htmlTemplateService.getCompiledNotificationBody({
        replacements: {
          ...configData,
          ...this.content,
          ...this.bodyProps,
          toEmail: this.toUser.email,
          toUserName: this.toUser.name,
        },
      }),
      text: `${this.content.paragraph} ${this.content.ctaLink} ${this.content.ctaText} ${this.content.signatureName}`,
    }
  }

  _getEmailTemplate() {
    return this.templateType === 'notification'
      ? this._getNotificationBody()
      : this._getInvitationBody()
  }

  async sendEmail() {
    const { html, text } = this._getEmailTemplate()

    const { fromEmail: from, cc, bcc } = this
    const { email: to } = this.toUser
    const { subject } = this.content

    const mailData = {
      to,
      cc,
      bcc,
      text,
      html,
      from,
      subject,
    }

    try {
      const email = await SendEmail.send(mailData)
      logger.info(
        `Sent email from: ${from} to: ${to} with subject: "${subject}"`,
      )
      logger.debug(
        `Sent email from: ${from} to: ${to} with subject: "${subject}"`,
      )
      return email
    } catch (e) {
      logger.error(e)
      throw new Error(e)
    }
  }
}

module.exports = EmailTemplate
