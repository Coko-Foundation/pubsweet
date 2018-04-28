import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import Action from './Action'

import th from '../helpers/themeHelper'

const Group = styled.div`
  ${props => get(props.theme, 'cssOverrides.ActionGroup')};
  ${props => get(props.theme, 'cssOverrides.ActionGroup.Root')};
`

const ActionWrapper = styled.div`
  display: inline-block;
  padding: 0 ${th('subGridUnit')};
  ${props => get(props.theme, 'cssOverrides.ActionGroup.ActionWrapper')};
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
