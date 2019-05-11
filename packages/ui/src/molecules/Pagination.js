import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

import { Icon, H6 } from '..'

export const usePagination = (items = [], perPage = 10, startPage = 0) => {
  const getLastPage = () => {
    const floor = Math.floor(items.length / perPage)
    return items.length % perPage ? floor : floor - 1
  }

  const [page, setPage] = useState(
    Math.min(Math.max(0, startPage), getLastPage()),
  )
  const [itemsPerPage, setItemsPerPage] = useState(perPage)

  const toFirst = () => {
    setPage(0)
  }

  const toLast = () => {
    setPage(getLastPage())
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

const Pagination = ({ items = [], startPage, itemsPerPage, children }) => {
  const { paginatedItems, ...controls } = usePagination(
    items,
    itemsPerPage,
    startPage,
  )

  const ui = (
    <Root>
      <StyledH6>Showing</StyledH6>
      <TextInput
        data-test-id="pagination-input"
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

      <StyledH6 data-test-id="pagination-label">{`${controls.page *
        controls.itemsPerPage +
        1} to ${
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

  return children({ ui, paginatedItems, controls })
}

Pagination.usePagination = usePagination

Pagination.defaultProps = {
  startPage: 0,
  itemsPerPage: 10,
}

Pagination.propTypes = {
  /** Items to paginate. */
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  /** The starting page of the pagination. Will be set to first or last possible page if given out of bounds values. */
  startPage: PropTypes.number,
  /** How many items should a page have. */
  itemsPerPage: PropTypes.number,
}

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
