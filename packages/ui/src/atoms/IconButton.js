import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Button, Icon } from '../atoms'

const UIIcon = styled(Icon)`
  vertical-align: text-bottom;
  padding: 0;
`

const IconButton = ({ icon, children, iconPosition, ...props }) => (
  <Button data-test-id={props['data-test-id']} {...props}>
    {children && iconPosition === 'end' && <span>{children}</span>}
    <UIIcon
      color={props.primary ? th('colorTextReverse') : th('colorPrimary')}
      size={3}
      {...props}
    >
      {icon}{' '}
    </UIIcon>
    {children && iconPosition === 'start' && <span>{children}</span>}
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
  icon: 'plus',
  iconPosition: 'start',
}

export default IconButton
