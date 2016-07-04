# Build status

[![build status](https://gitlab.coko.foundation/ci/projects/1/status.png?ref=master)](https://gitlab.coko.foundation/ci/projects/1?ref=master)

# Preconditions

Node.js, version above or equal to 4.2.2, is a requirement, read about how to install it here: [https://nodejs.org/en/](https://nodejs.org/en/)

Warning about `npm`: Because the newly released npm 3 changed the way npm installs nested dependencies (it flattens them), and we rely on previous behaviour (https://github.com/npm/npm/issues/9809) please use npm 2.x while we try to resolve this.


# Install

```bash
$ git clone git@gitlab.coko.foundation:pubsweet/core.git
$ cd core
$ npm install
```

# Start the server

First, initialize your blog by running and going through the setup process:
```bash
$ NODE_ENV=dev npm run setup
```

To start the JS compilation and webserver, run:
```bash
$ npm run dev
```

Point your browser to: http://localhost:3000/manage/posts and login with the chosen admin username and password and all should be well. Visit http://localhost:3000 for the blog landing page.

# Themes

If you want to write a custom theme, set your theme in `config.js`. When you require a style from a component, using e.g. `import 'Signup.scss'`, we'll automatically find the right themed style (e.g. `Signup-dark.scss` if set theme is `dark`). You can then continue working on your themed styles as usual, and the page will hot-reload when you change anything.

# How to look into the database for debugging purposes

Run a PouchDB server (comes with the app):
```bash
$ npm run pouchdb
```

And navigate to [http://localhost:5984/_utils/](http://localhost:5984/_utils/). Click "Add New Database" and enter "dev", to connect to the development database. You should now be able to run queries on your development database.

# Production installation

These are instructions for Ubuntu 15.10, exact steps may vary from OS to OS so if you're using another system, please take this as general guidance only.

First [install node 4.x](https://github.com/nodesource/distributions#debinstall)

```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Then clone the repository:

```bash
git clone https://gitlab.coko.foundation/pubsweet/core.git
```

Install the required npm modules:

```bash
npm install
```

Build the production JS:

```bash
npm run build
```

Configure your initial admin account, you have two options:
Through an interactive prompt

```bash
NODE_ENV=production npm run setup
```

Manually passing the arguments
```bash
npm run setup [--] [--username="yourusername"] [--email="youremail"] [--password="yourpassword"] [--collecion="yourcollection"]
```
Note: `--` is required by npm to pass the arguments

Start the server:

```bash
npm run start
```

The application should now be accessible through port 80 on your server.

# Rough roadmap/priorities (4th of July, 2016)

- Roles and permissions (https://gitlab.coko.foundation/pubsweet/core/issues/19)
- Collaboration/realtime sync of component state
- Backend extensions

- Backlog in our [kanban board](http://wekan.coko.foundation/b/fawY3QiLDhmY4Z9pf/pubsweet-core)
