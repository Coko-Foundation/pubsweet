Example of a pagination component.

```js
const items = Array.from({ length: 20 }, (v, i) => i)

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
