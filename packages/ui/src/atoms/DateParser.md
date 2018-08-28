DateParser component renders a child component with two parameters: date string formatted and timeAgo.

Usage:

Show formatted date and time passed.

```js
<DateParser timestamp="2018-05-18T10:38:12.063Z">
  {(timestamp, timeAgo) => (
    <span>
      {timestamp} - {timeAgo} ago
    </span>
  )}
</DateParser>
```

Show only formatted date.

```js
<DateParser timestamp="2018-05-18T10:38:12.063Z">
  {timestamp => <span>{timestamp}</span>}
</DateParser>
```

Change date format (f.e. to "MM.DD.YY").

```js
const date = new Date()
;<DateParser timestamp={date} dateFormat="MM.DD.YY">
  {timestamp => <span>{timestamp}</span>}
</DateParser>
```

Show only humanized version.

```js
const date = new Date()
;<DateParser timestamp={date}>
  {(timestamp, timeAgo) => <span>Saved {timeAgo} ago</span>}
</DateParser>
```

Shortcut to show a humanized version if the timestamp close as 3 days to current date

```js
const today = new Date()
const fewDaysAgo = new Date().setDate(today.getDate() - 2)
;<DateParser timestamp={fewDaysAgo} humanizeThreshold={3}>
  {(timestamp, daysAgo) => <span>{timestamp}</span>}
</DateParser>
```

or

```js
const today = new Date()
const fiveDaysAgo = new Date().setDate(today.getDate() - 5)
;<DateParser timestamp={fiveDaysAgo} humanizeThreshold={3}>
  {(timestamp, daysAgo) => <span>{timestamp}</span>}
</DateParser>
```
