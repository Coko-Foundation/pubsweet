const Nightmare = require('nightmare')

require('nightmare-wait-for-url')

Nightmare.action('getattr', function (selector, attr, done) {
  this.evaluate_now((selector, attr) => {
    return document.querySelector(selector).getAttribute(attr)
  }, done, selector, attr)
})

Nightmare.action('gettext', function (selector, done) {
  this.evaluate_now(selector => {
    return document.querySelector(selector).innerText
  }, done, selector)
})

const watch = process.env.WATCH_TESTS === 'true'

module.exports = () => Nightmare({
  show: watch,
  openDevTools: false,
  typeInterval: watch ? 200 : 10
}).viewport(1600, 1200)
