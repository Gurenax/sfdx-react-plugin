sfdx-react-plugin
=================

Create-React-App for Salesforce

[![Version](https://img.shields.io/npm/v/sfdx-react-plugin.svg)](https://npmjs.org/package/sfdx-react-plugin)
[![CircleCI](https://circleci.com/gh/wearemav3rik/sfdx-react-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/wearemav3rik/sfdx-react-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/wearemav3rik/sfdx-react-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-react-plugin/branch/master)
[![Codecov](https://codecov.io/gh/wearemav3rik/sfdx-react-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/wearemav3rik/sfdx-react-plugin)
[![Greenkeeper](https://badges.greenkeeper.io/wearemav3rik/sfdx-react-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/wearemav3rik/sfdx-react-plugin/badge.svg)](https://snyk.io/test/github/wearemav3rik/sfdx-react-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-react-plugin.svg)](https://npmjs.org/package/sfdx-react-plugin)
[![License](https://img.shields.io/npm/l/sfdx-react-plugin.svg)](https://github.com/wearemav3rik/sfdx-react-plugin/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-react-plugin
$ sfdx-react-plugin COMMAND
running command...
$ sfdx-react-plugin (-v|--version|version)
sfdx-react-plugin/0.0.0 darwin-x64 node-v8.9.4
$ sfdx-react-plugin --help [COMMAND]
USAGE
  $ sfdx-react-plugin COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx-react-plugin react:create [FILE]`](#sfdx-react-plugin-reactcreate-file)
* [`sfdx-react-plugin react:update`](#sfdx-react-plugin-reactupdate)

## `sfdx-react-plugin react:create [FILE]`

```
USAGE
  $ sfdx-react-plugin react:create [FILE]

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  (required) name of the app

EXAMPLE
  $ sfdx react:create -n HelloWorld
```

_See code: [src/commands/react/create.ts](https://github.com/wearemav3rik/sfdx-react-plugin/blob/v0.0.0/src/commands/react/create.ts)_

## `sfdx-react-plugin react:update`

```
USAGE
  $ sfdx-react-plugin react:update

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ sfdx react:update
```

_See code: [src/commands/react/update.ts](https://github.com/wearemav3rik/sfdx-react-plugin/blob/v0.0.0/src/commands/react/update.ts)_
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
