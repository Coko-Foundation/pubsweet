const authsomeMode = async (userId, operation, object, context) => {
  if (!userId) {
    return false
  }

  // It's up to us to retrieve the relevant models for our
  // authorization/authsome mode, e.g.
  const user = await context.models.User.find(userId)
  return !!user
}

module.exports = authsomeMode
