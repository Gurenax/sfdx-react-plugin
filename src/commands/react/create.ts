import { flags, Command } from '@oclif/command'
import { core, SfdxCommand } from '@salesforce/command'

// Libraries
const FS = require('fs')
const Util = require('util')
const createDirectoryPromise = Util.promisify(require('mkdirp'))
const writeFilePromise = Util.promisify(FS.writeFile)
const writeToFile = (filePath, contents) => {
  const date = new Date()
  const timestamp = date.toISOString()
  return writeFilePromise(filePath, contents).then(() => `${filePath} created`)
}
const exec = Util.promisify(require('child_process').exec)

// Update Command
export default class Create extends Command {
  public static examples = [`$ sfdx react:create -n HelloWorld`]

  public static args = [{ name: 'file' }]

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({
      char: 'n',
      description: 'name of the app',
      required: true
    })
  }

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false

  public async run(): Promise<any> {
    // tslint:disable-line:no-any
    const { flags } = this.parse(Create)
    const name = flags.name

    const templateBabelConfig = `{
  "presets": ["env", "react", "stage-1"]
}`

    const templatePackageJsonConfig = `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.7.0",
    "webpack": "^4.10.2",
    "webpack-cli": "^3.0.1"
  },
  "dependencies": {
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "react": "^16.4.0",
    "react-dom": "^16.4.0"
  }
}`

    const templateWebpackConfig = `const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './force-app/main/default/pages/${name}/src/index.js',
  output: {
    path: path.resolve(__dirname, 'force-app/main/default/staticresources/${name}'),
    filename: 'App.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'] // Loads .babelrc
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'inline-source-map' // Uncomment in production
}`

    const templateIndex = `import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
ReactDOM.render(<App />, document.getElementById('root'))`

    const templateApp = `import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>
          Hello World
        </h1>
      </div>
    )
  }
}

export default App`

    const templateIndexHtml = `<apex:page id="${name}" lightningStylesheets="true">
  <div id="root"></div>
  <script src="/resource/${name}/App.bundle.js" type="text/javascript"></script>
</apex:page>`

    const templateResourceMetadata = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Private</cacheControl>
    <contentType>application/zip</contentType>
    <description>${name} React App Bundle</description>
</StaticResource>`

    const templatePageMetadata = `<?xml version="1.0" encoding="UTF-8"?>
<ApexPage xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>42.0</apiVersion>
    <availableInTouch>true</availableInTouch>
    <confirmationTokenRequired>false</confirmationTokenRequired>
    <label>${name}</label>
</ApexPage>`

    return Promise.all([
      createDirectoryPromise(
        `force-app/main/default/pages/${name}/src/components`
      ),
      createDirectoryPromise(`force-app/main/default/staticresources/${name}`)
    ]).then(() =>
      Promise.all([
        writeToFile(`package.json`, templatePackageJsonConfig),
        writeToFile(`webpack.config.js`, templateWebpackConfig),
        writeToFile(`.babelrc`, templateBabelConfig),
        writeToFile(
          `force-app/main/default/pages/${name}/src/index.js`,
          templateIndex
        ),
        writeToFile(
          `force-app/main/default/pages/${name}/src/components/App.js`,
          templateApp
        ),
        writeToFile(
          `force-app/main/default/pages/${name}.page`,
          templateIndexHtml
        ),
        writeToFile(
          `force-app/main/default/staticresources/${name}.resource-meta.xml`,
          templateResourceMetadata
        ),
        writeToFile(
          `force-app/main/default/pages/${name}.page-meta.xml`,
          templatePageMetadata
        )
      ])
        .then(results => {
          // Output file creation
          this.log(JSON.stringify(results))
        })
        .then(async () => {
          // Install packages
          this.log('Installing packages...')
          const { stdout, stderr } = await exec(`yarn install`)
          this.log(stdout)
          this.log(stderr)
        })
        .then(async () => {
          // Run webpack
          this.log('Building app...')
          const { stdout, stderr } = await exec(`yarn build`)
          this.log(stdout)
          this.log(stderr)
        })
    )
  }
}
