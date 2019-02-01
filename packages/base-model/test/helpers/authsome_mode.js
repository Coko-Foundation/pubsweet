module.exports = async (userId, operation, object, context) => {
  const user = await context.models.User.find(userId)
  if (
    !(user.username === 'anotheruser') &&
    object.type === 'manuscript' &&
    object.title.match(/otherUser can see/)
  ) {
    return false
  }

  if (operation === 'publishManuscript') {
    // Try to fetch the current Manuscript using the context
    // to verify that you can, in fact, do it.
    const manuscript = await context.models.Manuscript.find(object.current.id)
    const isAuthor = manuscript.owners.includes(user.id)

    if (isAuthor && user.username === 'anotheruser') {
      return true
    } else if (isAuthor) {
      return {
        filter: update => ({ approvedByAuthor: update.approvedByAuthor }),
      }
    } else if (user.username === 'anotheruser') {
      return {
        filter: update => ({ published: update.published }),
      }
    }
  }

  return true
}
