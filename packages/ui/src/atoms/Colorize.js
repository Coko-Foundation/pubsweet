import React from 'react'
import { withTheme } from 'styled-components'
import { compose } from 'recompose'

const Colorize = Component => {
  const Colorized = ({
    primary,
    secondary,
    furniture,
    success,
    error,
    warning,
    reverse,
    placeholder,
    theme = {},
    ...props
  }) => {
    const color =
      (primary && theme.colorPrimary) ||
      (secondary && theme.colorSecondary) ||
      (furniture && theme.colorFurniture) ||
      (success && theme.colorSuccess) ||
      (error && theme.colorError) ||
      (warning && theme.colorWarning) ||
      (reverse && theme.colorTextReverse) ||
      (placeholder && theme.colorTextPlaceholder) ||
      theme.colorText

    return <Component color={color} {...props} />
  }

  Colorized.propTypes = Object.assign({}, Component.propTypes)
  return Colorized
}

export default compose(withTheme, Colorize)
