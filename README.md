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

And then open another terminal window in the same directory and initialize your blog by running and going through the setup process:
```bash
$ NODE_ENV=dev node api/setup.js
```

Point your browser to: http://localhost:3000/admin/manager and login with the chosen admin username and password and all should be well. Visit http://localhost:3000 for the blog landing page.

# Roadmap (6th of March, 2016)

Until 13th of March 2016:

- Public API endpoints (Bearer authentication with anonymous/public fallback that filters objects based on a boolean value such as {published: true}).
- Public UI flow (visit blog, read blogposts)
- Contributor role UI flow (signup as a new user, be given a contributor role by an admin, be able to create a blog post)

Until 20th of March 2016:

- Collaboration hub in collaboration with Substance.
