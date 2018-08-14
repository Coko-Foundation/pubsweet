const fs = require('fs')
const handlebars = require('handlebars')

const getNotificationBody = ({ replacements }) => {
  handlePartial('header', replacements)
  handlePartial('footer', replacements)
  handlePartial('signature', replacements)
  if (replacements.hasLink) handlePartial('button', replacements)
  handlePartial('body', replacements)

  return getMainTemplate({ fileName: 'notification', context: replacements })
}

const getInvitationBody = ({ replacements }) => {
  handlePartial('invHeader', replacements)
  handlePartial('footer', replacements)
  handlePartial('invUpperContent', replacements)
  handlePartial('invButtons', replacements)
  handlePartial('invManuscriptData', replacements)
  handlePartial('signature', replacements)
  handlePartial('invLowerContent', replacements)

  return getMainTemplate({ fileName: 'invitation', context: replacements })
}

const readFile = path =>
  fs.readFileSync(path, { encoding: 'utf-8' }, (err, file) => {
    if (err) {
      throw err
    } else {
      return file
    }
  })

const handlePartial = (partialName = 'signature', context = {}) => {
  let partial = readFile(`${__dirname}/templates/partials/${partialName}.hbs`)
  const template = handlebars.compile(partial)
  partial = template(context)
  handlebars.registerPartial(partialName, partial)
}

const getMainTemplate = ({ fileName, context }) => {
  const htmlFile = readFile(`${__dirname}/templates/${fileName}.html`)
  const htmlTemplate = handlebars.compile(htmlFile)
  const htmlBody = htmlTemplate(context)
  return htmlBody
}

module.exports = {
  getNotificationBody,
  getInvitationBody,
}
