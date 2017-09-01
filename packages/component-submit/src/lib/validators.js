import striptags from 'striptags'

export const split = (separator = ',') => value => {
  return value ? value.split(separator) : []
}

export const join = (separator = ',') => value => {
  return value ? value.join(separator) : value
}

export const required = value => {
  return value ? undefined : 'Required'
}

export const minChars = min => {
  const message = `Enter at least ${min} characters`

  return value => {
    const text = striptags(value)

    if (!text || text.length < min) {
      return message
    }

    return undefined
  }
}

export const maxChars = max => {
  const message = `Enter no more than ${max} characters`

  return value => {
    const text = striptags(value)

    if (!text || text.length > max) {
      return message
    }

    return undefined
  }
}

export const minSize = min => {
  const message = `Enter at least ${min} ${min === 1 ? 'item' : 'items'}`

  return value => {
    if (!value) {
      return message
    }

    if (value.length < min) {
      return message
    }

    return undefined
  }
}
