import React from 'react'
import PropTypes from 'prop-types'
import { th } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'
import { Button, Icon } from '../atoms'

const UIButton = styled(Button)`
  line-height: calc(${th('gridUnit')} * 2);
`

const IconButton = ({ icon, ...props }) => (
  <UIButton {...props}>
    <Icon
      color={props.primary ? th('colorTextReverse') : th('colorPrimary')}
      data-testid="iconButton"
      {...props}
    >
      {icon}{' '}
    </Icon>
  </UIButton>
)

IconButton.propTypes = {
  /** Icon name (An icon name, from the Feather icon set.) */
  icon: PropTypes.string,
  /** Makes button a primary button */
  primary: PropTypes.bool,
}

export default IconButton
