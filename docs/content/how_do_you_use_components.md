Using a component is as simple as installing it, configuring it, and then including the functionality it exports in your own app's code.

## Installing

Components can be installed using the PubSweet CLI:

pubsweet add login

This installs the `pubsweet-component-login` package, and adds the component to the app config so PubSweet knows to load it.

Note that the CLI adds the `pubsweet-component-` prefix automatically if it's not already present.

You can also manually install components using npm or yarn:

npm install \--save pubsweet-component-login

yarn add pubsweet-component-login

If you do that, you'll need to also add the component manually to the list in `config/components.json`.

## Configuring

There are two aspects to configuring components:

- The app can be configured to know which components to load.
- The component itself can be configured.

### Specify which components to load

PubSweet will load any components in the `pubsweet.components` array of the configuration object.

You can add components to this array manually, or if you install the component using the CLI they will be added for you.

In a pubsweet CLI-generated app, the list of loaded components is in its own JSON file at `./config/components.json`.

```js static
;[
  'pubsweet-component-login',
  'pubsweet-component-signup',
  'pubsweet-component-wizard',
]
```

You need to use the full `npm` package name in the config array, i.e. `pubsweet-component-login` , not just `login`.

### Configuring a component

Any component can define its own configurable options, and can access general configuration from the client or server.

Each component's `README.md` should specify which configuration options can be used, and what they do.

**Example snippets from AppBar component**.

The app bar appears at the top of every page of the application.

_Functionality customisation:_

```jsx static
//It displays the name of the application (as a link to the home page), the
//username of the current user, and a link to sign out.
<AppBar brand="xpub" user={{ username: 'user', admin: true }} />

//When the user is not signed in, only the login link is displayed.

<AppBar brand="xpub" />
```

```jsx static
//Can optionally pass navigation links.
<AppBar
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

```jsx static
//Can use a custom component as right element.
//Right component props - the right component will be passed the following props:
// - user - the current logged in user; null if no user is logged in
// - onLogoutClick - the logout function
// - loginLink - link to redirect users to login
const RightComponent = ({ user, loginLink, onLogoutClick }) => (
  <div
    style={{
      display: 'flex',
      width: 200,
      justifyContent: 'space-between',
    }}
  >
    <span>{user ? user.username : 'admin'}</span>
    <button onClick={onLogoutClick}>logout</button>
  </div>
)

<AppBar
  brand="xpub"
  user={{ username: 'userName', admin: true }}
  rightComponent={RightComponent}
  onLogoutClick={() => console.log('Logout clicked')}
/>
```

_Style customization:_

Edit your `theme.js` file under `cssOverrides` to override desired properties:

```js static
const cokoTheme = {
//....
  cssOverrides: {
    AppBar: {
      Root: css\`
        box-shadow: 0 0 1px ${th('colorPrimary')};
        margin-bottom: 1px;
      \`,
      LogoLink: css\`
        &:hover:before {
          visibility: hidden;
        }
      \`,
    }
  }
}
export const cokoTheme
```
