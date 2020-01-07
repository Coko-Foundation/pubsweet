import React from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withHandlers } from 'recompose'
import { override } from '@pubsweet/ui-toolkit'

// #region styles
const Root = styled.div.attrs(props => ({
  'data-test-id': props['data-test-id'] || 'list-root',
}))`
  display: flex;
  flex-direction: column;

  ${override('ui.List')};
`

const Item = styled.div.attrs(props => ({
  // we could make a helper for this
  'data-test-id': props['data-test-id'] || 'list-item',
}))`
  ${override('ui.List.Item')};
`
// #endregion

const DefaultListItem = withHandlers({
  onItemClick: ({ onItemClick }) => item => () => {
    typeof onItemClick === 'function' && onItemClick(item)
  },
})(({ onItemClick, ...item }) => (
  <Item onClick={onItemClick(item)}>{item.name}</Item>
))

const List = ({
  children,
  items = [],
  itemKey = 'id',
  component: Component = DefaultListItem,
  ...rest
}) => (
  <Root>
    {items.map(item => (
      <Component key={get(item, itemKey)} {...item} {...rest} />
    ))}
  </Root>
)

List.propTypes = {
  items: PropTypes.array.isRequired,
  itemKey: PropTypes.string,
  onItemClick: PropTypes.func,
}

export default List
