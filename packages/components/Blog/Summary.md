Post preview with link to read more.

Basic display

```js
const fragment = {
  title: 'A post',
  authors: ['Anne Author'],
  published_at: '2017-01-02',
}
;<Summary fragment={fragment} />
```

With abstract and two authors

```js
const fragment = {
  title: 'A post',
  source: '<abstract>Something something something</abstract>',
  authors: ['Rae Searcher', 'Si Entist'],
  published_at: '2017-01-02',
}
;<Summary fragment={fragment} />
```
