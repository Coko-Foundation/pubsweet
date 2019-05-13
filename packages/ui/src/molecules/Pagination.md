### Pagination UI widget and the pagination results are not coupled.

```js
const items = Array.from({ length: 27 }, (v, i) => `item ${i + 1}`)

;<Pagination items={items}>
  {({ ui, paginatedItems }) => (
    <React.Fragment>
      {ui}
      <hr />
      <ul>
        {paginatedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </React.Fragment>
  )}
</Pagination>
```

### Usage with your own custom pagination UI (render props method).

```js
const items = Array.from({ length: 27 }, (v, i) => `item ${i + 1}`)

;<Pagination items={items}>
  {({ paginatedItems, controls }) => (
    <React.Fragment>
      <button onClick={controls.prevPage}>prev</button>
      <button onClick={controls.nextPage}>next</button>
      <br />

      <ul>
        {paginatedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </React.Fragment>
  )}
</Pagination>
```

Using the usePagination hook. Show only 5 items per page.

```js
const items = Array.from({ length: 27 }, (v, i) => `item ${i + 1}`)

const ShowcaseComponent = () => {
  const pagination = Pagination.usePagination(items, 5)

  return (
    <React.Fragment>
      <button onClick={pagination.toFirst}>To first</button>
      <button onClick={pagination.prevPage}>Prev</button>
      <button onClick={pagination.nextPage}>Next</button>
      <button onClick={pagination.toLast}>To last</button>
      <ul>
        {pagination.paginatedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}

;<ShowcaseComponent />
```

### Exposed controls to implement custom pagination UI widget.

```js
const items = Array.from({ length: 27 }, (v, i) => `item ${i + 1}`)

const ControlsShowcase = () => {
  const controls = Pagination.usePagination(items)

  return (
    <React.Fragment>
      <button onClick={controls.toFirst}>To first</button>
      <button onClick={controls.prevPage}>Prev</button>
      <button onClick={controls.nextPage}>Next</button>
      <button onClick={controls.toLast}>To last</button>
      <br />
      {Object.entries(controls).map(([key, value]) => (
        <React.Fragment key={key}>
          <code>
            {`${key}  ${
              typeof value !== 'function' ? ' - ' + value : ''
            } - ${typeof value} `}
          </code>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

;<ControlsShowcase />
```
