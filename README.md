# PubSweet Components

This repository is a monorepo of first-party PubSweet components.

# Developing your own components

## Conventions

### Front end components

Package layout

- `src/` contains ES6/JSX/SASS sources (pointed to by `pkg.esnext`)
- `dist/` contains ES5/CSS files in CommonJS module format (pointed to by `pkg.main`)
- `dist/esm/` contains ES5/CSS files in ES module format (pointed to by `pkg.module`)

All modules forming part of the public API of the component should be exported from the index.js. Deep imports are discouraged (e.g. `package-name/some/file`).

### Backend components

Should specify a minimum required version of Node and have no transpiling.