Component that renders a date string.

```js
<DateParser timestamp="2018-05-18T10:38:12.063Z">
  {(timestamp, daysAgo) => (
    <span>
      {timestamp} - {daysAgo}
    </span>
  )}
</DateParser>
```
