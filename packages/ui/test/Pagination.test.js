import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import { cleanup, fireEvent, render } from '@testing-library/react'

import Pagination from '../src/molecules/Pagination'

const items = Array.from({ length: 30 }, (v, i) => `item ${i + 1}`)

describe('Pagination', () => {
  beforeEach(cleanup)

  it('renders the correct number of items', () => {
    const { paginatedItems } = setup({
      items,
    })

    expect(paginatedItems).toEqual(items.slice(0, 10))
  })

  it('changes to number of items shown per page', () => {
    const { getByTestId, childrenSpy } = setup({
      items,
    })

    fireEvent.change(getByTestId('pagination-input'), {
      target: { value: 3 },
    })

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(0, 3),
        controls: expect.objectContaining({
          itemsPerPage: '3',
        }),
      }),
    )
  })

  it('switches to the next page', () => {
    const { getByTestId, childrenSpy } = setup({
      items,
      itemsPerPage: 5,
    })

    fireEvent.click(getByTestId('pagination-next'))

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(5, 10),
        controls: expect.objectContaining({
          page: 1,
        }),
      }),
    )
  })

  it('switches back and forth between pages', () => {
    const { getByTestId, childrenSpy } = setup({ items })

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(0, 10),
        controls: expect.objectContaining({
          page: 0,
        }),
      }),
    )

    fireEvent.click(getByTestId('pagination-next'))

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(10, 20),
        controls: expect.objectContaining({
          page: 1,
        }),
      }),
    )

    fireEvent.click(getByTestId('pagination-prev'))

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(0, 10),
        controls: expect.objectContaining({
          page: 0,
        }),
      }),
    )
  })

  it('jumps to last and first pages', () => {
    const { getByTestId, queryByTestId, childrenSpy } = setup({
      items,
      itemsPerPage: 7,
    })

    // prev and toFirst icons should be hidden while on first page
    expect(queryByTestId('pagination-first')).toBeNull()
    expect(queryByTestId('pagination-prev')).toBeNull()
    expect(queryByTestId('pagination-last')).toBeInTheDocument()
    expect(queryByTestId('pagination-next')).toBeInTheDocument()

    fireEvent.click(getByTestId('pagination-last'))

    // next and toLast icons should be hidden while on the last page
    expect(queryByTestId('pagination-last')).toBeNull()
    expect(queryByTestId('pagination-next')).toBeNull()
    expect(queryByTestId('pagination-first')).toBeInTheDocument()
    expect(queryByTestId('pagination-prev')).toBeInTheDocument()

    // we should render only the last items
    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(28),
        controls: expect.objectContaining({
          page: 4,
        }),
      }),
    )

    fireEvent.click(getByTestId('pagination-first'))

    // we should render the first items
    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(0, 7),
        controls: expect.objectContaining({
          page: 0,
        }),
      }),
    )
  })

  it('sets starting page to first when given negative value', () => {
    const { childrenSpy } = setup({ items, startPage: -2 })

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(0, 10),
        controls: expect.objectContaining({
          page: 0,
        }),
      }),
    )
  })

  it('sets starting page to last when given an out of bounds value', () => {
    const { childrenSpy } = setup({ items, startPage: 1000 })

    expect(childrenSpy).toHaveBeenLastCalledWith(
      expect.objectContaining({
        paginatedItems: items.slice(20),
        controls: expect.objectContaining({
          page: 2,
        }),
      }),
    )
  })
})

function setup(props = {}) {
  let renderArgs
  const childrenSpy = jest.fn(paginationArgs => {
    renderArgs = paginationArgs

    return paginationArgs.ui
  })

  const utils = render(
    <ThemeProvider theme={{}}>
      <Pagination {...props}>{childrenSpy}</Pagination>
    </ThemeProvider>,
  )
  return { ...utils, ...renderArgs, childrenSpy }
}
