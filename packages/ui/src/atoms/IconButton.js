import React from 'react'
import PropTypes from 'prop-types'
import { th } from '@pubsweet/ui-toolkit'
import { Button, Icon } from '../atoms'

const IconButton = ({ icon, children, iconPosition, ...props }) => (
  <Button {...props}>
    {children != null && iconPosition === 'end' && <span>{children}</span>}
    <Icon
      color={props.primary ? th('colorTextReverse') : th('colorPrimary')}
      size={2}
      {...props}
    >
      {icon}{' '}
    </Icon>
    {children != null && iconPosition === 'start' && <span>{children}</span>}
  </Button>
)

IconButton.propTypes = {
  /** The contents of the button (text, icon etc.) */
  children: PropTypes.node,
  /** Icon name (An icon name, from the Feather icon set.) */
  icon: PropTypes.string,
  /** Icon Position (Defines the position of the icon (if is is at the start of the button , or at the end)) */
  iconPosition: PropTypes.oneOf(['start', 'end']),
  /** Makes button a primary button */
  primary: PropTypes.bool,
}

IconButton.defaultProps = {
  children: null,
  iconPosition: 'start',
}

export default IconButton
