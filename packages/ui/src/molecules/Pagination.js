import React, { useState, Fragment } from 'react'
import { th, override } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'

import { Icon, H6 } from '../'

export const usePagination = (items = []) => {
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const toFirst = () => {
    setPage(0)
  }

  const toLast = () => {
    const floor = Math.floor(items.length / itemsPerPage)
    setPage(items.length % itemsPerPage ? floor : floor - 1)
  }

  const changeItemsPerPage = e => {
    setItemsPerPage(e.target.value)
    setPage(0)
  }

  const nextPage = () => {
    setPage(page =>
      page * itemsPerPage + itemsPerPage < items.length ? page + 1 : page,
    )
  }

  const prevPage = () => {
    setPage(page => Math.max(0, page - 1))
  }

  return {
    page,
    toLast,
    setPage,
    toFirst,
    prevPage,
    nextPage,
    itemsPerPage,
    changeItemsPerPage,
    maxItems: items.length,
    hasMore: itemsPerPage * (page + 1) < items.length,
    paginatedItems: items.slice(page * itemsPerPage, itemsPerPage * (page + 1)),
  }
}

const Pagination = ({ items = [], children }) => {
  const controls = usePagination(items)

  const ui = (
    <Root>
      <StyledH6>Showing</StyledH6>
      <TextInput
        onChange={controls.changeItemsPerPage}
        value={controls.itemsPerPage}
      />
      {controls.page !== 0 && (
        <Fragment>
          <Icon data-test-id="pagination-first" onClick={controls.toFirst}>
            chevrons_left
          </Icon>
          <Icon data-test-id="pagination-prev" onClick={controls.prevPage}>
            chevron_left
          </Icon>
        </Fragment>
      )}

      <StyledH6>{`${controls.page * controls.itemsPerPage + 1} to ${
        controls.hasMore
          ? controls.itemsPerPage * (controls.page + 1)
          : controls.maxItems
      } out of ${items.length}`}</StyledH6>
      {controls.hasMore && (
        <Fragment>
          <Icon data-test-id="pagination-next" onClick={controls.nextPage}>
            chevron_right
          </Icon>
          <Icon data-test-id="pagination-last" onClick={controls.toLast}>
            chevrons_right
          </Icon>
        </Fragment>
      )}
    </Root>
  )

  return children({ ui, paginatedItems: controls.paginatedItems, controls })
}

Pagination.usePagination = usePagination

// @component
export default Pagination

// #region styles
const Root = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  ${override('ui.Pagination')};
`

const TextInput = styled.input`
  margin: 0 ${th('gridUnit')};
  width: calc(${th('gridUnit')} * 4);
  height: calc(${th('gridUnit')} * 3);
  text-align: center;
  vertical-align: middle;

  ${override('ui.Pagination.Input')};
`

const StyledH6 = styled(H6)`
  margin: 0;
`
// #endregion
