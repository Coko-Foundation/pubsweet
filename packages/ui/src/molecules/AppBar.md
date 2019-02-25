The app bar appears at the top of every page of the application.

It displays the name of the application (as a link to the home page), the
username of the current user, and a link to sign out.

```js
<AppBar brand="xpub" user={{ username: 'user', admin: true }} />
```

When the user is not signed in, only the login link is displayed.

```js
<AppBar brand="xpub" />
```

Can optionally pass navigation links.

```js
import { Action } from '@pubsweet/ui'
;<AppBar
  brand="xpub"
  navLinkComponents={[
    <Action active to="/home">
      Home
    </Action>,
    <Action to="/about">About</Action>,
  ]}
  user={{
    username: 'user',
    admin: true,
  }}
/>
```

Can optionally pass an image for a brand.

```js
import { Action } from '@pubsweet/ui'
;<AppBar
  brand={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-220 -50 440 300"
      width="64"
      fillOpacity="0.5"
    >
      <circle cx="0" cy="50" fill="red" r="100" />
      <circle cx="70" cy="150" fill="blue" r="100" />
      <circle cx="-70" cy="150" fill="green" r="100" />
    </svg>
  }
  navLinkComponents={[
    <Action to="/home">Home</Action>,
    <Action to="/about">About</Action>,
  ]}
/>
```

Can use a custom component as right element.

**Right component props** - the right component will be passed the following props

- _user_ - the current logged in user; null if no user is logged in
- _onLogoutClick_ - the logout function
- _loginLink_ - link to redirect users to login

```js
;<div /> //hacky workaround for https://github.com/styleguidist/react-styleguidist/issues/886

const RightComponent = ({ user, loginLink, onLogoutClick }) => (
  <div
    style={{
      padding: 10,
      border: '1px solid gray',
      display: 'flex',
      width: 200,
      justifyContent: 'space-between',
    }}
  >
    <span>{user ? user.username : 'admin'}</span>
    <button onClick={onLogoutClick}>logout</button>
  </div>
)
;<AppBar
  brand="xpub"
  user={{ username: 'userName', admin: true }}
  rightComponent={RightComponent}
  onLogoutClick={() => console.log('Logout clicked')}
/>
```
