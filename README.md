<h1 align="center">SFDX React Plugin</h1>
<p align="center">The Create-React-App for Salesforce</p>

## Minimum requirements
- Npm
- Yarn

---
## SFDX Plugin Documentation

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
sfdx-react-plugin/1.0.0 darwin-x64 node-v10.3.0
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
