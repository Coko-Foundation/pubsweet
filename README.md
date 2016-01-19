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

# Roadmap (18th of February, 2016)

Until 1st of February 2016:

Permissions, roles and authentication. Ongoing in the `auth` branch.

February: Collaboration, multiple concurrent users.
