const Polyglot = require('node-polyglot')
const assign = require('object-assign')

// TODO: probably we want to load that dynamically someday
const phrases = assign({},
  require('json!lens-writer/app/i18n/en.json'),
  require('./en.json')
)

const i18n = new Polyglot({locale: 'en', phrases: phrases})

export default i18n
