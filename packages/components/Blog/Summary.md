Post preview with link to read more.

Basic display

```js
const fragment = {
  title: 'A post',
  owners: [{ username: 'Anne Author' }],
  published_at: '2017-01-02',
}
;<Summary fragment={fragment} />
```

With abstract and two authors

```js
const fragment = {
  title: 'A post',
  source: '<abstract>Something something something</abstract>',
  owners: [{ username: 'Rae Searcher' }, { username: 'Si Entist' }],
  published_at: '2017-01-02',
}
;<Summary fragment={fragment} />
```
