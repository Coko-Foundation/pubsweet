The main component of a blog or news page.

Basic display:

```js
const getCollections = () => new Promise(() => null)
;<Blog blog={{ title: 'Some Blog' }} posts={[]} actions={{ getCollections }} />
```

With a post:

```js
const getCollections = () => new Promise(() => null)
;<Blog
  blog={{ title: 'Some Blog' }}
  posts={[
    {
      id: 1,
      title: 'A post',
      source: '<abstract>Something something something</abstract>',
      authors: ['Anne Author'],
      published_at: '2017-01-02',
      published: true,
    },
  ]}
  actions={{ getCollections }}
/>
```
