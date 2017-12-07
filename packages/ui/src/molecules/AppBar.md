The app bar appears at the top of every page of the application.

It displays the name of the application (as a link to the home page), the
username of the current user, and a link to sign out.

```js
<AppBar brandName="xpub" user={{ username: 'user', admin: true }} />
```

When the user is not signed in, only the login link is displayed.

```js
<AppBar brandName="xpub" />
```

Can optionally pass navigation links or image for brand.

```js
<AppBar
  brandName={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-150 -50 300 350"
      width="50"
      height="50"
      fillOpacity="0.5"
    >
      <circle cx="0" cy="50" fill="red" r="100" />
      <circle cx="70" cy="150" fill="blue" r="100" />
      <circle cx="-70" cy="150" fill="green" r="100" />
    </svg>
  }
  navLinks={
    <div>
      <a href="">Home</a> | <a href="">About</a>
    </div>
  }
/>
```
