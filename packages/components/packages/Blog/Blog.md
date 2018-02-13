The main component of a blog or news page.

Basic display:

```js
;<Blog blog={{ title: 'Some Blog' }} posts={[]} />
```

With a post:

```js
;<Blog
  blog={{ title: 'Some Blog' }}
  posts={[
    {
      id: 1,
      title: 'A post',
      source: '<abstract>Something something something</abstract>',
      owners: [{ username: 'Anne Author' }],
      published_at: '2017-01-02',
      published: true,
    },
  ]}
/>
```
