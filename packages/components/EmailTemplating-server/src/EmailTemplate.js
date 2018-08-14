const config = require('config')
const helpers = require('./helpers')
const SendEmail = require('@pubsweet/component-send-email')

const logoUrl = config.get('logo')

class Email {
  constructor({
    type = 'system',
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
    },
  }) {
    this.type = type
    this.toUser = toUser
    this.content = content
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

  getBody({ body = {}, isReviewerInvitation = false }) {
    if (isReviewerInvitation) {
      return {
        html: helpers.getInvitationBody({
          replacements: {
            ...body,
            logo: logoUrl,
            ...this.content,
            toUserName: this.toUser.name,
          },
        }),
        text: `${body.resend} ${body.upperContent} ${body.manuscriptText} ${
          body.lowerContent
        } ${this.content.signatureName}`,
      }
    }

    return {
      html: helpers.getNotificationBody({
        replacements: {
          ...body,
          logo: logoUrl,
          toUserName: this.toUser.name,
          ...this.content,
        },
      }),
      text: `${body.paragraph} ${this.content.ctaLink} ${
        this.content.ctaText
      } ${this.content.signatureName}`,
    }
  }

  sendEmail({ text, html }) {
    const mailData = {
      from: config.get('mailer.from'),
      to: this.toUser.email,
      subject: this.content.subject,
      text,
      html,
    }

    SendEmail.send(mailData)
  }
}

module.exports = Email
