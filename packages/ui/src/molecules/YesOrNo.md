A group of radio buttons that provides just two options: "Yes" or "No"

```js
<YesOrNo name="yesorno" onChange={value => console.log(value)} />
```

If a value is set, one option is selected.

```js
<YesOrNo
  name="yesorno-value"
  value="yes"
  onChange={value => console.log(value)}
/>
```

Different statuses have different colours:

```js
<div>
  <YesOrNo
    primary
    name="yesornocoloured"
    onChange={value => console.log(value)}
  />

  <YesOrNo
    warning
    name="yesornocoloured"
    onChange={value => console.log(value)}
  />
</div>
```
