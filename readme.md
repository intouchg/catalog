# @intouchg/catalog

CLI and Storybook for exploring and cloning React components

## Using the CLI

```sh
npx @intouchg/catalog@latest DIR_NAME -c COMPONENT_NAME -t
```

All arguments are optional. If a component name is not passed to the CLI then a searchable list of components will be presented to the user.

-   `DIR_NAME` will default to `process.cwd()`
-   Passing the `-c COMPONENT_NAME` or `--component COMPONENT_NAME` flag allows skipping the component name prompt
-   Passing the `-t` or `--typescript` flag will download TypeScript component source code instead of JavaScript

## Motivation

Building complex components that can address every use case while still providing an elegant developer experience is nearly impossible. Even when done well, bundle sizes are bloated and the developer must learn the API of each complex component. This project takes the approach of providing source code "recipes" that are intended to be cloned and customized as needed.

-   Explore complex components through Storybook
-   Style with CSS classnames
-   Download source code into your project
-   Customize as desired

## Architecture

Although this project is structured as a Lerna monorepo, individual component packages are not published to npm at this time. Packages are intended to be cloned, not imported. Because they are not installed through npm, it's possible for updates to be made to a package without updating its version number. This could be fixed by using npm as the package cloning mechanism.

All packages are built in TypeScript and transpiled while preserving JSX, which allows the developer to clone either TypeScript or JavaScript source code.

Because the CLI uses metadata that is updated when the CLI package is published, but the CLI downloads components from the github master branch, it's possible for the metadata and the downloaded component data to be out of sync. This could be fixed by retrieving metadata at runtime from the downloaded component code, rather than at CLI build time.

## Creating new packages

-   Create a new directory in the `packages` directory
-   Packages must contain a `package.json` file with a `name`, `version`, and `description`
-   The `package.json` `name` field must be the same as the name of the package directory
-   Packages have access to `peerDependencies` listed in the repo root `package.json` file
-   Packages may add additional `peerDependencies` and `devDepdendencies` in their individual `package.json` files
-   Packages cannot add `dependencies` in their `package.json` files
-   Packages must contain a Storybook story file written in TypeScript
-   Packages cannot use index.tsx or index.ts files
-   Packages cannot contain JavaScript files

## The `build.js` script

The build script gathers metadata about all packages in the monorepo. This metadata is used by the CLI - so a new version of the CLI should be published when packages are updated or created.
