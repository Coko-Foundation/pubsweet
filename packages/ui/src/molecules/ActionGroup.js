import React from 'react'
import styled from 'styled-components'
import { override, th } from '@pubsweet/ui-toolkit'

import Action from './Action'

const Group = styled.div`
  ${override('ui.ActionGroup')};
`

const ActionWrapper = styled.div`
  display: inline-block;
  padding: 0 ${th('gridUnit')};

  ${override('ui.ActionGroup.ActionWrapper')};
`

const ActionGroup = props => {
  const children = React.Children.map(props.children, child => (
    <ActionWrapper>{child}</ActionWrapper>
  ))

  return <Group>{children}</Group>
}

ActionGroup.propTypes = {
  children: (props, propName, componentName) => {
    const prop = props[propName]
    let error = null

    React.Children.forEach(prop, child => {
      if (child.type !== Action) {
        error = new Error('ActionGroup should only take Actions as children')
      }
    })

    return error
  },
}

export default ActionGroup
