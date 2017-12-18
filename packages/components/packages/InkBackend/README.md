## Configuration

In order to use this component, the following configuration needs to be added to a PubSweet application inside a section named `pubsweet-component-ink-backend`:

* `inkEndpoint`: the URL of an [INK](https://gitlab.coko.foundation/INK/ink-api) instance
* `email` and `password`: the email address and password used to authenticate with INK
* `pusher`: a set of configuration values matching those used in the INK instance:
  * `appKey`: the `SLANGER_APP_ID` value from INK's `.env` file
  * `wsHost` and `httpHost`: the hostname of the INK instance (as used for `inkEndpoint`, but not a full URL)
  * `wsPort` and `httpPort`: the ports that Slanger is running on in the INK instance, as configured in the `slanger` section of INK's `docker-compose.yml`.
* `recipes`: recipe keys (as used in the `InkFrontend` component) that map to recipe IDs in the INK instance.


For example:

```json
{
  "pubsweet-component-ink-backend": {
    "inkEndpoint": "https://ink.example.com/",
    "email": "ink@example.com",
    "password": "abcdef",
    "pusher": {
      "appKey": "abc123",
      "wsHost": "ink.example.com",
      "wsPort": 8080,
      "httpHost": "ink.example.com",
      "httpPort": 4567
    },
    "recipes": {
      "foo": "1",
      "bar": "2"
    }
  }
}
```


