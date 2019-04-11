import React from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import { th, override } from '@pubsweet/ui-toolkit'

const Wrapper = styled.div`
  align-items: baseline;
  display: flex;
  margin-bottom: 0.8em;
  margin-top: 2em;
  flex-direction: column;

  ${override('xpub-edit.MenuBar.Wrapper')};
`
const ToolBar = styled.div`
  ${override('xpub-edit.MenuBar.ToolBar')};
  width: 100%;
`

const Legend = styled.div`
  font-size: ${th('fontSizeBase')};
  margin-right: 10px;

  ${override('xpub-edit.MenuBar.Legend')};
`

const MenuBar = ({ title, menu, state, dispatch, fileUpload }) => (
  <Wrapper>
    {title && <Legend>{title}</Legend>}
    <ToolBar>
      {map(menu, (item, key) =>
        item.menu({
          handle: e => {
            e.preventDefault()
            item.run(state, dispatch)
          },
          item,
          key,
          state,
          title,
          dispatch,
          fileUpload,
        }),
      )}
    </ToolBar>
  </Wrapper>
)

export default MenuBar
