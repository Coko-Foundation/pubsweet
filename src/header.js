const colors = require('colors/safe')
const c = colors.cyan
const p = colors.magenta
const b = colors.blue
const header = `
            ______      _     _____                   _
            | ___ \\    | |   /  ___|                 | |
${c('▓▓▓▓')}${p('▓▓▓')}  | |_/ /   _| |__ \\ \`--.__      _____  ___| |_
 ${c('▓')}${b('▓')}  ${b('▓')}${p('▓')}   |  __/ | | | '_ \\ \`--. \\ \\ /\\ / / _ \\/ _ \\ __|
  ${b('▓▓▓▓')}    | |  | |_| | |_) /\\__/ /\\ V  V /  __/  __/ |_
    ${b('▓')}      \\_|   \\__,_|_.__/\\____/  \\_/\\_/ \\___|\\___|\\__|
`

module.exports = () => {
  console.log(header)
}
