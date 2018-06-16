const getTemplateBabelConfig = (): string =>
`{
  "presets": ["env", "react", "stage-1"]
}`

const getTemplatePackageJsonConfig = (name: string): string =>
`{
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

const getTemplateWebpackConfig = (name: string): string =>
`const path = require('path')
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

const getTemplateIndex = (): string =>
`import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
ReactDOM.render(<App />, document.getElementById('root'))`

const getTemplateApp = (): string =>
`import React, { Component } from 'react'

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

const getTemplateIndexHtml = (name: string): string =>
`<apex:page id="${name}" lightningStylesheets="true">
  <div id="root"></div>
  <script src="/resource/${name}/App.bundle.js" type="text/javascript"></script>
</apex:page>`

const getTemplateResourceMetadata = (name: string): string =>
`<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Private</cacheControl>
    <contentType>application/zip</contentType>
    <description>${name} React App Bundle</description>
</StaticResource>`

const getTemplatePageMetadata = (name: string): string =>
`<?xml version="1.0" encoding="UTF-8"?>
<ApexPage xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>42.0</apiVersion>
    <availableInTouch>true</availableInTouch>
    <confirmationTokenRequired>false</confirmationTokenRequired>
    <label>${name}</label>
</ApexPage>`

export {
  getTemplateBabelConfig,
  getTemplatePackageJsonConfig,
  getTemplateWebpackConfig,
  getTemplateIndex,
  getTemplateApp,
  getTemplateIndexHtml,
  getTemplateResourceMetadata,
  getTemplatePageMetadata
}