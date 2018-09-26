const config = require('config')
const helpers = require('./helpers')
const SendEmail = require('@pubsweet/component-send-email')

const configData = {
  logo: config.get('journal.logo'),
  address: config.get('journal.address'),
  privacy: config.get('journal.privacy'),
  ctaColor: config.get('journal.ctaColor'),
  logoLink: config.get('journal.logoLink'),
  publisher: config.get('journal.publisher'),
}
class Email {
  constructor({
    type = 'system',
    fromEmail = config.get('journal.fromEmail'),
    toUser = {
      id: '',
      email: '',
      name: '',
    },
    content = {
      subject: '',
      ctaLink: '',
      ctaText: '',
      signatureName: '',
      unsubscribeLink: '',
      signatureJournal: '',
    },
  }) {
    this.type = type
    this.toUser = toUser
    this.content = content
    this.fromEmail = fromEmail
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

  getInvitationBody({ emailBodyProps }) {
    return {
      html: helpers.getCompiledInvitationBody({
        replacements: {
          ...configData,
          ...this.content,
          ...emailBodyProps,
          toEmail: this.toUser.email,
          toUserName: this.toUser.name,
        },
      }),
      text: `${emailBodyProps.resend} ${emailBodyProps.upperContent} ${
        emailBodyProps.manuscriptText
      } ${emailBodyProps.lowerContent} ${this.content.signatureName}`,
    }
  }

  getNotificationBody({ emailBodyProps }) {
    return {
      html: helpers.getCompiledNotificationBody({
        replacements: {
          ...configData,
          ...this.content,
          ...emailBodyProps,
          toEmail: this.toUser.email,
          toUserName: this.toUser.name,
        },
      }),
      text: `${emailBodyProps.paragraph} ${this.content.ctaLink} ${
        this.content.ctaText
      } ${this.content.signatureName}`,
    }
  }

  async sendEmail({ text, html }) {
    const { fromEmail: from } = this
    const { email: to } = this.toUser
    const { subject } = this.content

    const mailData = {
      to,
      text,
      html,
      from,
      subject,
    }

    try {
      await SendEmail.send(mailData)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = Email
