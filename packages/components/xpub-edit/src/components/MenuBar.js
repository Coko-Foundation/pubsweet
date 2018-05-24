import React from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import { th } from '@pubsweet/ui-toolkit'
import MenuButton from './MenuButton'

const Wrapper = styled.div`
  align-items: baseline;
  display: flex;
  margin-bottom: 0.8em;
  margin-top: 0;
  flex-direction: column;
`
const ToolBar = styled.div``

const Legend = styled.div`
  font-size: ${th('fontSizeBase')};
  margin-right: 10px;
`

const MenuBar = ({ title, menu, state, dispatch }) => (
  <Wrapper>
    {title && <Legend>{title}</Legend>}
    <ToolBar>
      {map(menu, (item, key) => (
        <MenuButton
          handle={e => {
            e.preventDefault()
            item.run(state, dispatch)
          }}
          item={item}
          key={key}
          state={state}
          title={title}
        />
      ))}
    </ToolBar>
  </Wrapper>
)

export default MenuBar
