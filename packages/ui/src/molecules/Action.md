Actions arose from current designs (like the Appbar) where we had to blend
links and buttons, but make them appear the same.

The Action centralizes the visual part of this scenario, while leaving the
underlying mechanics of links and buttons intact.

Action that have a `to` prop render as links.

```js
<Action to="/">I am a link.</Action>
```

Action that do not have a `to` prop render as buttons.

```js
<Action>I am a button.</Action>
```

All props that are valid in the `Button` and `Link` components are passed down to their respective components.

```js
<Action onClick={() => {}}>I have an onClick handler</Action>
```

An action can be marked as active. (useful for a navigation bar)

```js
<Action active>Active</Action>
```
