module.exports = (cmd, opts) => {
  const args = ['node'].concat((cmd || '').split(' '))
  if (opts) {
    for (const key in opts) {
      args.push(`--${key}`)
      args.push(`${opts[key]}`)
    }
  }
  return args
}
