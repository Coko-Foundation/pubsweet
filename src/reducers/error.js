// Updates error message to notify about the failed fetches.
export default function (state = null, action) {
  const {error} = action

  if (error) {
    console.log(error)
    return error.message
  } else {
    return null
  }
}
