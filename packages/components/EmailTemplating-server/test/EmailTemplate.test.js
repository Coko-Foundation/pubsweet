const EmailTemplate = require('../src/EmailTemplate')

describe('Email Template', () => {
  it('creates an email from the notification template', async () => {
    const email = new EmailTemplate({
      type: 'user',
      fromEmail: 'test@example.com',
      toUser: {
        email: 'user@example.com',
        name: `Lastname`,
      },
      content: {
        ctaText: 'MANUSCRIPT DETAILS',
        signatureJournal: 'Test journal',
        signatureName: `Example Editor`,
        subject: 'Manuscript test',
        paragraph: 'We are pleased to inform you that the test passed.',
        unsubscribeLink: `http://localhost:3000/unsubscribe/exampleId`,
        ctaLink: `http://localhost:3000/someUrl`,
      },
      bodyProps: {
        hasLink: true,
        hasIntro: true,
        hasSignature: true,
      },
    })

    const emailResult = await email.sendEmail()
    expect(JSON.parse(emailResult.message)).toMatchSnapshot({
      messageId: expect.any(String),
    })
  })

  it('creates an email from the invitation template', async () => {
    const email = new EmailTemplate({
      type: 'user',
      templateType: 'invitation',
      fromEmail: 'test@example.com',
      toUser: {
        email: 'user@example.com',
        name: `Lastname`,
      },
      content: {
        manuscriptText: 'Some manuscript text',
        agreeLink: 'http://localhost:3000/agree',
        declineLinke: 'http://localhost:3000/decline',
        subText: 'Some text below buttons',
        title: 'Manuscript Title',
        authorsList: 'One Author, Two Author, Three Author',
        abstract: 'Manuscript abstract',
        signatureJournal: 'Test journal',
        signatureName: `Example Editor`,
        subject: 'Invitation test',
        unsubscribeLink: 'http://localhost:3000/unsubscribe/exampleId',
      },
      bodyProps: {
        upperContent: 'Content right at the top',
        resend: false,
        lowerContentLink: 'http://localhost:3000/lowerLink',
        manuscriptText: 'Some plain text manuscript text',
        lowerContent: 'Some content at the bottom',
      },
    })

    const emailResult = await email.sendEmail()
    expect(JSON.parse(emailResult.message)).toMatchSnapshot({
      messageId: expect.any(String),
    })
  })
})
