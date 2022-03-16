# @intouchg/catalog

CLI and Storybook for exploring and downloading React components

## Using the CLI

```sh
npx @intouchg/catalog@latest PATH -c COMPONENT_NAME -b BRANCH_NAME -t
```

All arguments are optional. If a component name is not passed to the CLI then a searchable list of components will be presented to the user.

-   `PATH` is the directory path that the component will be downloaded into, and defaults to `process.cwd()`
-   `-c COMPONENT_NAME` or `--component COMPONENT_NAME` is the name of the component to download. If left empty, the user will select from a searchable list
-   `-b BRANCH_NAME` or `--branch BRANCH_NAME` is the git branch to download from, defaults to `master`
-   `-t` or `--typescript` will download TypeScript component source code instead of JavaScript

## Motivation

Building complex components that can address every use case while still providing an elegant developer experience is nearly impossible. Even when done well, bundle sizes are bloated and the developer must learn the API of each complex component. This project takes the approach of providing source code "recipes" that are intended to be downloaded and customized as needed.

-   Explore complex components through Storybook
-   Style with CSS classnames
-   Download source code into your project
-   Customize as desired

## Architecture

Although this project is structured as a Lerna monorepo, individual component packages are not published to npm at this time. Package source code is intended to be downloaded, not imported. Because they are not installed through npm, it's possible for updates to be made to a package without updating its version number. This could be fixed by using npm as the package download mechanism, or adding a pre-commit build step.

All packages are built in TypeScript and transpiled while preserving JSX, which allows the developer to download either TypeScript or JavaScript source code.

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

The build script gathers metadata about all packages in the monorepo. This metadata is used by the CLI - so updated metadata should always be pushed to the git repo alongside any package changes.
