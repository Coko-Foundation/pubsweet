Icon is a wrapper that is responsible for fetching the icon, either from `react-feather` by default, or from the theme if an icon override has been set.

Defaults to `react-feather`'s plus icon (based on the `iconName` prop) because it can't find an override with this name in your theme:

```js
<Icon2 iconName="Plus" overrideName="not-in-any-theme" />
```

Use the dropdown on the left to change to the eLife theme & you will see this icon change from `react-feather`'s plus icon to the plus icon eLife uses in their theme:

```js
<Icon2
  iconName="Plus"
  overrideName="@pubsweet-pending.PeoplePicker.PersonPod.Add"
/>
```
