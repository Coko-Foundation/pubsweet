// Updates error message to notify about the failed fetches.
export default function(state = null, { error }) {
  if (error && error.message) {
    console.error(error)
    return error.message
  }

  return null
}
