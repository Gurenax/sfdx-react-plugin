<h1 align="center">React Plugin for Salesforce DX</h1>
<p align="center">
  <a href="https://github.com/Gurenax/sfdx-react-plugin">
    <img src="assets/images/heading.png" alt="" height="100" width="auto"/>
  </a><br/><br/>
  <em>Simple and easy to use Create-React-App plugin for Salesforce DX</em>
</p>

---

## Salesforce DX
- Salesforce DX is a Command Line Interface tool based on the Node.js Open CLI Framework (OCLIF) built by Heroku.
- To extend the features of the CLI tool, we are given the capability to create custom plugins (Salesforce DX plugins).

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

- Code can be easily tested with a variety of test frameworks


### Why use SFDX plugin instead of just a Shell Script?
- Org information is available in SFDX
- Shell script is less flexible than TypeScript
- We can use open source libraries with plugins

---

## React Plugin
- The objective is to build a simple React code generator similar to Facebook's `create-react-app`.
- We will only include the essential starter libraries which means that we will not include the libraries that we will never use in a VisualForce context such as the Node server in which React usually runs.
- The react app will be uploaded as a static resource and embedded in a VisualForce page.
- The plugin will be responsible for the creation of metadata and relevant paths for assets such as images, icons and stylesheets.
- It will also compress assets (i.e. images) such that the 5mb limit for static resources will not be reached.

### What we need
- NPM and Yarn
- Webpack
  - CSS Loader plugin
  - Style Loader plugin
  - URL Loader
  - Webpack Image Loader
- Babel
- Babel presets
- Bootstrap

---

## Quick Start Guide
### Before you begin, you will need to install
- NPM - [Get NPM](https://www.npmjs.com/get-npm)
- Yarn - [Get Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

---

### Install the plugin
- Clone this project
```
git clone https://github.com/Gurenax/sfdx-react-plugin
```
- Install the packages
```
cd sfdx-react-plugin
yarn install
```
- Link the plugin to SFDX
```
sfdx plugins:link .
```

---

### Running the plugin
- To create a new React App, run:
```
sfdx react:create -n HelloWorld -u OrgName
```

- After making changes to the React App, run:
```
sfdx react:update
```

- Push changes to your Org
```
sfdx force:source:push -u <Org Name>
```

---

# SFDX Generated Docs

<!-- toc -->
* [SFDX Generated Docs](#sfdx-generated-docs)
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-react-plugin
$ sfdx-react-plugin COMMAND
running command...
$ sfdx-react-plugin (-v|--version|version)
sfdx-react-plugin/1.0.0 darwin-x64 node-v8.9.4
$ sfdx-react-plugin --help [COMMAND]
USAGE
  $ sfdx-react-plugin COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx-react-plugin react:create`](#sfdx-react-plugin-reactcreate)
* [`sfdx-react-plugin react:update`](#sfdx-react-plugin-reactupdate)

## `sfdx-react-plugin react:create`

```
USAGE
  $ sfdx-react-plugin react:create

OPTIONS
  -h, --help=help                                 display the help texts
  -n, --name=name                                 name of the app
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  $ sfdx react:create -n HelloWorld -u OrgName
  $ sfdx react:create -n HelloWorld -u OrgName --apiversion 43.0
```

_See code: [src/commands/react/create.ts](https://github.com/Gurenax/sfdx-react-plugin/blob/v1.0.0/src/commands/react/create.ts)_

## `sfdx-react-plugin react:update`

```
USAGE
  $ sfdx-react-plugin react:update

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ sfdx react:update
```

_See code: [src/commands/react/update.ts](https://github.com/Gurenax/sfdx-react-plugin/blob/v1.0.0/src/commands/react/update.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
