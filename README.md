# Preconditions

Node.js, version above or equal to 4.22, is a requirement, read about how to install it here: [https://nodejs.org/en/](https://nodejs.org/en/)

npm : Since the newly released npm 3 is causing issues with nested dependencies (https://github.com/npm/npm/issues/9809) please use npm 2.x


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

# Roadmap (14th of December, 2015)

Until 15th of January 2016:

Permissions, roles and authentication.

Late January: Collaboration, multiple concurrent users