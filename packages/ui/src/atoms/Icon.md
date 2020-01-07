An icon, from the [Feather](https://feathericons.com/) icon set.

```js
<Icon>arrow_right</Icon>
```

The color can be changed.

```js
<div>
  <Icon error>arrow_right</Icon>
  <Icon primary>arrow_right</Icon>
</div>
```

The size can be changed.

```js
<Icon size={6}>arrow_right</Icon>
```

The icon can be overriden in your theme:

```js static
const theme = {
  icons: {
    arrow_right: () => <CustomArrowIcon />,
  },
}
```
