Are you struggling to get your application to run, and no-one on Mattermost can figure it out? It might be time to have a go at debugging yourself. Depending on what you are trying to debug, the client side or the server side, the approaches vary.

## Debugging code running on the client

The following instructions are for Google Chrome but the process is similar for other web browsers.

Chrome Developer Tools is accessible from the menu. The most important tabs are Network, which shows HTTP requests and responses, Console, which shows errors and logging, and Sources, which allows setting execution breakpoints.

The [React Developer Tools extension](https://github.com/facebook/react-devtools 'undefined') is highly recommended as it enables viewing of the component hierarchy and inspecton of the data passed as props to each component.

The [Apollo Developer Tools](https://github.com/apollographql/apollo-client-devtools 'undefined') extension provides an alternative view of the GraphQL HTTP requests and also shows the contents of the local cache.

## Debugging the code running on the server

Node.js has a built in debugger which can use Chrome Developer Tools as an interface. Enabling the debugger is a multi step process (Mac/Linux only):

1.  Start the application as usual e.g. `pubsweet start`
2.  In another terminal/tab run `pgrep -f startup/start.js | xargs kill -sigusr1`
3.  You should see the text "Debugger attached" in the terminal in which the app is running.
4.  Open a new tab in Chrome and visit the URL `chrome://inspect`
5.  You should see one entry listed under "Remote Target".
6.  Click "inspect".

You can now set breakpoints and step through execution of your server code.

Note that you must repeat the process if you restart the server or if it is restarted automatically due to a code change. This is not ideal, and an alternative, simpler method of debugging is planned. As an alternative, debugging with `console.log` is a surprisingly good option.
