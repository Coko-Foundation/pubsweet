const authsomeMode = async (userId, operation, object, context) => {
  if (!userId) {
    return false
  }
  return true
}

module.exports = authsomeMode
