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
