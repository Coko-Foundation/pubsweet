# Preconditions

Node.js, version above or equal to 4.22, is a requirement, read about how to install it here: [https://nodejs.org/en/](https://nodejs.org/en/)

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

And then initialize your blog by running:
```bash
$ ./bin/init.sh
```

Point your browser to: http://localhost:3000/admin/manager and all should be well. Visit http://localhost for the blog landing page.

# Roadmap (14th of December, 2015)

Next two weeks (until 1st of January 2016):

Permissions, roles and authentication.

January: Collaboration, multiple concurrent users

