# Blog

## Salesforce DX
- Salesforce DX is a Command Line Interface tool based on the Node.js Open CLI Framework (OCLIF) built by Heroku.
- To extend the features of the CLI tool, we are given the capability to create custom plugins which are Salesforce DX plugins.

### Salesforce DX Plugins
- There are several use cases in which we can use Salesforce DX plugins:
  - File manipulation scripts
  - Automation scripts
  - Source code generators
  - Code clean up scripts
  - Etc

- Plugins are written in TypeScript
  - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
    - Strongly typed
    - Gains the capability of writing interfaces
  - Compatible with the latest ECMAScript specification.

- Packages are managed with Yarn
  - Easy integration with 3rd party Libaries (e.g. Webpack)

- Code can be easily tested with test frameworks

---

## React Plugin
- The objective is to build a simple React code generator similar to Facebook's `create-react-app`.
- We will only include the essential starter libraries which means that we will not include the libraries that we will never use in a VisualForce context such as the Node server in which React usually runs.
- The react app will be uploaded as a static resource and embedded in a VisualForce page.
- The plugin will be responsible for the creation of metadata and relevant paths for assets such as images, icons and stylesheets.
