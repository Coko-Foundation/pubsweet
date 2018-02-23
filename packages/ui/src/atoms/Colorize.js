import React from 'react'

const Colorize = Component => {
  const Colorized = ({
    primary,
    secondary,
    quiet,
    furniture,
    success,
    error,
    warning,
    reverse,
    placeholder,
    ...props
  }) => {
    const color =
      (primary && 'var(--color-primary)') ||
      (secondary && 'var(--color-secondary)') ||
      (quiet && 'var(--color-quiet)') ||
      (furniture && 'var(--color-furniture)') ||
      (success && 'var(--color-success)') ||
      (error && 'var(--color-error)') ||
      (warning && 'var(--color-warning)') ||
      (reverse && 'var(--color-text-reverse)') ||
      (placeholder && 'var(--color-text-placeholder)') ||
      'var(--color-text)'

    return <Component color={color} {...props} />
  }

  Colorized.propTypes = Object.assign({}, Component.propTypes)
  return Colorized
}

export default Colorize
