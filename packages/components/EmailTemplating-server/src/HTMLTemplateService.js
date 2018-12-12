const fs = require('fs')
const handlebars = require('handlebars')

const getCompiledNotificationBody = ({ replacements }) => {
  handlePartial('header', replacements)
  if (replacements.hasIntro) handlePartial('intro', replacements)
  handlePartial('footer', replacements)
  if (replacements.hasSignature) handlePartial('signature', replacements)
  if (replacements.hasLink) handlePartial('button', replacements)
  handlePartial('body', replacements)

  return compileBody({ fileName: 'notification', context: replacements })
}

const getCompiledInvitationBody = ({ replacements }) => {
  handlePartial('invHeader', replacements)
  handlePartial('footer', replacements)
  handlePartial('invUpperContent', replacements)
  handlePartial('invButtons', replacements)
  handlePartial('invManuscriptData', replacements)
  handlePartial('signature', replacements)
  handlePartial('invLowerContent', replacements)

  return compileBody({ fileName: 'invitation', context: replacements })
}

const readFile = path => fs.readFileSync(path, 'utf-8')

const handlePartial = (partialName, context = {}) => {
  let partial = readFile(`${__dirname}/templates/partials/${partialName}.hbs`)
  const template = handlebars.compile(partial)
  partial = template(context)
  handlebars.registerPartial(partialName, partial)
}

const compileBody = ({ fileName, context }) => {
  const htmlFile = readFile(`${__dirname}/templates/${fileName}.html`)
  const htmlTemplate = handlebars.compile(htmlFile)
  const htmlBody = htmlTemplate(context)
  return htmlBody
}

module.exports = {
  getCompiledNotificationBody,
  getCompiledInvitationBody,
}
