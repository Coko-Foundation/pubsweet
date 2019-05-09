```js
import { Icon } from '@pubsweet/ui'
const icon = <Icon>check</Icon>
const icon2 = <Icon>X</Icon>
;<InputWithAddons
  addons={[
    {
      icon: icon,
      buttonProps: {
        primary: true,
        onClick: () => console.log('icon1 woohoo'),
      },
    },
    { icon: icon2, buttonProps: { onClick: () => console.log('icon2 blarg') } },
  ]}
  inputProps={{
    value: 'hello I am an input',
    onChange: () => console.log('changed'),
  }}
/>
```
