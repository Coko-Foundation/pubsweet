Actions arose from current designs (like the Appbar) where we had to blend
links and buttons, but make them appear the same.  
The Action centralizes the visual part of this scenario, while leaving the
underlying mechanics of links and buttons intact.

Action that is a link.

```js
<Action to="/">I am a link.</Action>
```

Action that is a button.

```js
<Action>I am a button.</Action>
```

An action can be marked as active. (useful for a navigation bar)

```js
<Action active>Active</Action>
```
