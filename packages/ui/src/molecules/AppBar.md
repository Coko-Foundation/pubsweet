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

Can optionally pass navigation links or image for brand.

```js
<AppBar
  brand={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-220 -50 440 300"
      fillOpacity="0.5"
    >
      <circle cx="0" cy="50" fill="red" r="100" />
      <circle cx="70" cy="150" fill="blue" r="100" />
      <circle cx="-70" cy="150" fill="green" r="100" />
    </svg>
  }
  navLinkComponents={[
    <Link to="/home">Home</Link>,
    <Link to="/about">About</Link>,
  ]}
/>
```
