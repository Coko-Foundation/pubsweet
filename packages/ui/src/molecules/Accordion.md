A component that can be expanded or collapsed.

```js
<Accordion label="Header" startExpanded>
  <hr />
  <span>the possibilities</span>
  <hr />
  <span>are endless</span>
  <hr />
  <Accordion label="Inception">
    <hr />
    <span>He's a good kid and a devil behind the wheel.</span>
    <hr />
  </Accordion>
</Accordion>
```

* The children are responsable with styling inside the accordion.

```js
<Accordion label="Big lorem ipsum">
  <div style={{ margin: 16 }}>
    What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's standard dummy
    text ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release of
    Letraset sheets containing Lorem Ipsum passages, and more recently with
    desktop publishing software like Aldus PageMaker including versions of Lorem
    Ipsum. Why do we use it? It is a long established fact that a reader will be
    distracted by the readable content of a page when looking at its layout. The
    point of using Lorem Ipsum is that it has a more-or-less normal distribution
    of letters, as opposed to using 'Content here, content here', making it look
    like readable English. Many desktop publishing packages and web page editors
    now use Lorem Ipsum as their default model text, and a search for 'lorem
    ipsum' will uncover many web sites still in their infancy. Various versions
    have evolved over the years, sometimes by accident, sometimes on purpose
    (injected humour and the like).
  </div>
</Accordion>
```

* Change header icon

```js
<Accordion
  data-test-id="test-me"
  label="My icon is different"
  icon="arrow-down"
>
  <hr />
  <span>it's ok to be different</span>
  <hr />
</Accordion>
```

* Custom header

```js
const MyHeader = ({ toggle }) => {
  return <div onClick={toggle} style={{
    backgroundColor: 'lavender',
    display: 'flex',
    justifyContent: 'space-between',
  }}>
    <span>CUSTOM HEADER SO NICE</span>
    <span>Some info here</span>
  </div>
}

<Accordion header={MyHeader}>
 <hr />
  <span>thanos stars</span>
  <hr />
  <span>in deadpool 2</span>
  <hr />
</Accordion>
```
