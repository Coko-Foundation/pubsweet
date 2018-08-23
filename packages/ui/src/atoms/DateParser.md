Component that renders a date string.

```js
<DateParser timestamp="2018-05-18T10:38:12.063Z">
  {(timestamp, daysAgo) => (
    <span>
      {timestamp} - {daysAgo} ago
    </span>
  )}
</DateParser>
```

Component that renders a date string with humanize duration threshold.

```js
const date = new Date()

;<DateParser timestamp={date} durationThreshold={0}>
  {(timestamp, daysAgo) => <span>{timestamp}</span>}
</DateParser>
```
