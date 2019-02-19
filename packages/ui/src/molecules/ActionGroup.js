import React from 'react'
import styled from 'styled-components'
import { override, th } from '@pubsweet/ui-toolkit'

const Group = styled.div`
  ${override('ui.ActionGroup')};
`

const ActionWrapper = styled.div`
  display: inline-block;
  padding: 0 ${th('gridUnit')};

  ${override('ui.ActionGroup.ActionWrapper')};
`

const ActionGroup = props => {
  const children = React.Children.map(
    props.children,
    child => child && <ActionWrapper>{child}</ActionWrapper>,
  )

  return <Group className={props.className}>{children}</Group>
}

export default ActionGroup
