import React from 'react'
import { withTheme } from 'styled-components'
import { get, has } from 'lodash'
import { Icon as PubSweetIcon } from '@pubsweet/ui'

// @todo remove this file and use pubsweet's Icon once it supports override via theme
const Icon = ({ iconName, overrideName, className, theme, ...props }) => {
  const isOverrideInTheme = has(theme.icons, overrideName)
  if (isOverrideInTheme) {
    const OverrideIcon = get(theme.icons, overrideName)
    return <OverrideIcon className={className} {...props} />
  }

  return <PubSweetIcon className={className} {...props} />
}

export default withTheme(Icon)
