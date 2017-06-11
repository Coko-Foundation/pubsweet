// https://github.com/nodejs/node/issues/6379
// https://github.com/nodejs/node/issues/6456
const outputs = [process.stdout, process.stderr]
outputs.forEach(s => {
  s && s.isTTY && s._handle && s._handle.setBlocking && s._handle.setBlocking(true)
})
