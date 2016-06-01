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
$ NODE_ENV=dev node api/setup.js
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

Configure your initial admin account:

```bash
npm run setup
```

Start the server:

```bash
npm run start
```

The application should now be accessible through port 80 on your server.

# Roadmap (10th of May, 2016)

Until 13th of May 2016
- Support for hot reloading with themes
- Standalone debug tools for current PouchDB

Until 20th of May 2016
- How to transfer front-end locking by Yannis and Christos into other components?
- Backend locking mechanisms exploration
- Science Writer incoming from Michael and Oliver

Until 27th of May 2016
- 2nd iteration of PubSweet UI with Pepper
- Explore one click deploys with Juan

Until 3rd of June 2016
- Implementation of new PubSweet interface by Juan

10th of June
- Release of Science Blogger 1.0


- Backlog in our [kanban board](http://wekan.coko.foundation/b/fawY3QiLDhmY4Z9pf/pubsweet-core)
