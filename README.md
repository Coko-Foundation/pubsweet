# Build status

[![build status](https://gitlab.coko.foundation/ci/projects/1/status.png?ref=master)](https://gitlab.coko.foundation/ci/projects/1?ref=master)

# Preconditions

Node.js, version above or equal to 4.22, is a requirement, read about how to install it here: [https://nodejs.org/en/](https://nodejs.org/en/)

Warning about `npm`: Because the newly released npm 3 changed the way npm installs nested dependencies (it flattens them), and we rely on previous behaviour (https://github.com/npm/npm/issues/9809) please use npm 2.x while we try to resolve this.


# Install

```bash
$ git clone git@gitlab.coko.foundation:pubsweet/core.git
$ cd core
$ npm install
```

# Start the server

To start the JS compilation and webserver, run:
```bash
$ npm run dev
```

And then open another terminal window in the same directory and initialize your blog by running:
```bash
$ ./bin/init.sh
```

Point your browser to: http://localhost:3000/admin/manager and all should be well. Visit http://localhost:3000 for the blog landing page.

# Roadmap (2nd of February, 2016)

Until 5th of February 2016:

- Reading the (JWT) token's signed values in the API (username)
- Getting all of the user's roles via username
- Determining read, write, create and destroy permissions based on found roles
- Linking helper on Collection/Fragment/User models to permissions (e.g. user.save())
- Executing an action, or returning an error if permissions are lacking
- Simple UI for role management for the admin role (User dashboard)
  - Assign read/write/create/destroy permissions to collections, fragments and users

Rest of February: Collaboration, multiple concurrent users.
