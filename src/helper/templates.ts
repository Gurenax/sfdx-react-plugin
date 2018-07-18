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
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "image-webpack-loader": "^4.3.1",
    "style-loader": "^0.21.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.8"
  },
  "dependencies": {
    "bootstrap": "^4.1.1",
    "jquery": "^3.3.1",
    "popper.js": "^1.14.3",
    "react": "^16.4.1",
    "react-dom": "^16.4.1"
  }
}`

const getTemplateWebpackConfig = (name: string): string =>
`const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './${name}/src/index.js',
  output: {
    path: path.resolve(__dirname, 'force-app/main/default/staticresources/${name}'),
    filename: 'App.bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'] // Loads .babelrc
      },
      {
        test:/.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(png|svg|ico|jpg|jpeg|gif|pdf)$/,
        use: [{
          loader: 'url-loader',
        }, {
          loader: 'image-webpack-loader',
        }]
      }
    ]
  },
  stats: {
    colors: true
  }
  //devtool: 'inline-source-map' // Comment when in production
}`

const getTemplateIndex = (): string =>
`import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
ReactDOM.render(<App />, document.getElementById('root'))`

const getTemplateApp = (name: string, apiVersion: string, orgName: string, trialExpirationDate: string): string =>
`import React, { Component } from 'react'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React + Visualforce</h1>
        </header>
        <div className="jumbotron">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">This is a simple react app for Visualforce.</p>
          <hr className="my-4"/>
          <p>It uses Webpack for resource bundling and Bootstrap for styling.</p>
          <a className="btn btn-primary btn-lg" href="https://github.com/wearemav3rik/sfdx-react-plugin" role="button">Learn more</a>
        </div>
        <div className="ml-4">
          <p>This is your ${name} project and it's using API Version ${apiVersion}</p>
          <p>This is your org: ${orgName} and it will expire on ${new Date(trialExpirationDate).toDateString()}</p>
        </div>
      </div>
    )
  }
}

export default App`

const getTemplateCSS = (): string =>
`.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}

.App-header {
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
}

.App-title {
  font-size: 1.5em;
}

.App-intro {
  font-size: large;
}

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`
const getTemplateLogo = (): string =>
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
<g fill="#61DAFB">
    <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
    <circle cx="420.9" cy="296.5" r="45.7"/>
    <path d="M520.5 78.1z"/>
</g>
</svg>`

const getTemplateIndexHtml = (name: string): string =>
`<apex:page id="${name}" lightningStylesheets="true">
  <div id="root"></div>
  <script src="/resource/${name}/App.bundle.js" type="text/javascript"></script>
</apex:page>`

const getTemplateTestHtml = (name: string): string =>
`<html>
  <body>
    <div id="root"></div>
    <script src="force-app/main/default/staticresources/${name}/App.bundle.js" type="text/javascript"></script>
  </body>
</html>`

const getTemplateResourceMetadata = (name: string): string =>
`<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Private</cacheControl>
    <contentType>application/zip</contentType>
    <description>${name} React App Bundle</description>
</StaticResource>`

const getTemplatePageMetadata = (name: string, apiVersion: string): string =>
`<?xml version="1.0" encoding="UTF-8"?>
<ApexPage xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>${apiVersion}</apiVersion>
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
  getTemplateCSS,
  getTemplateLogo,
  getTemplateIndexHtml,
  getTemplateTestHtml,
  getTemplateResourceMetadata,
  getTemplatePageMetadata
}