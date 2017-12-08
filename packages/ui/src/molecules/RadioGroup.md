A group of radio buttons.

```js
const options = [
  {
    value: 'one',
    label: 'One'
  },
  {
    value: 'two',
    label: 'Two'
  },
  {
    value: 'three',
    label: 'Three'
  }
];

<RadioGroup 
  options={options} 
  name="radiogroup"
  onChange={value => console.log(value)}/>
```

The buttons can be displayed inline

```js
const options = [
  {
    value: 'one',
    label: 'One'
  },
  {
    value: 'two',
    label: 'Two'
  },
  {
    value: 'three',
    label: 'Three'
  }
];

<RadioGroup 
  options={options} 
  name="radiogroup-inline"
  inline={true}
  onChange={value => console.log(value)}/>
```
