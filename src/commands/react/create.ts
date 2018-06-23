import { flags, Command } from '@oclif/command'
import { core, SfdxCommand } from '@salesforce/command'
import {
  getTemplateBabelConfig,
  getTemplatePackageJsonConfig,
  getTemplateWebpackConfig,
  getTemplateIndex,
  getTemplateApp,
  getTemplateIndexHtml,
  getTemplateTestHtml,
  getTemplateResourceMetadata,
  getTemplatePageMetadata
} from '../../helper/templates'

// Libraries
const FS = require('fs')
const Util = require('util')

// Executes terminal commands
const exec = Util.promisify(require('child_process').exec)

// Creates directories
const createDirectoryPromise = Util.promisify(require('mkdirp'))

// File key-value pair interface
interface File {
  key: string;
  value: string;
}

// Writes files
// const writeFilePromise = Util.promisify(FS.writeFile)
const writeToFile = (filePath: string, contents: string): Promise<any> => (
  // writeFilePromise(filePath, contents).then(() => `${filePath} created`)
  core.SfdxUtil.writeFile(filePath, contents).then(() => `${filePath} created`)
)
const writeToFiles = (files: File[]): Promise<any> => (
  Promise.all(
    files.map(element => writeToFile(element.key, element.value))
  ).then(result => result)
)

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

    // Load templates
    const templateBabelConfig = getTemplateBabelConfig()
    const templatePackageJsonConfig = getTemplatePackageJsonConfig(name)
    const templateWebpackConfig = getTemplateWebpackConfig(name)
    const templateIndex = getTemplateIndex()
    const templateApp = getTemplateApp()
    const templateIndexHtml = getTemplateIndexHtml(name)
    const templateTestHtml = getTemplateTestHtml(name)
    const templateResourceMetadata = getTemplateResourceMetadata(name)
    const templatePageMetadata = getTemplatePageMetadata(name)

    // Create key-value pair of filename and file path
    const files:File[] = [
      { key: `package.json`, value: templatePackageJsonConfig },
      { key: `webpack.config.js`, value: templateWebpackConfig },
      { key: `.babelrc`, value: templateBabelConfig },
      { key: `force-app/main/default/pages/${name}/src/index.js`,
        value: templateIndex },
      { key: `force-app/main/default/pages/${name}/src/components/App.js`,
        value: templateApp },
      { key: `force-app/main/default/pages/${name}.page`,
        value: templateIndexHtml },
      { key: `force-app/main/default/pages/${name}.test.html`,
        value: templateTestHtml },
      { key: `force-app/main/default/staticresources/${name}.resource-meta.xml`,
        value: templateResourceMetadata },
      { key: `force-app/main/default/pages/${name}.page-meta.xml`,
        value: templatePageMetadata }
    ]

    return Promise.all([
      createDirectoryPromise(
        `force-app/main/default/pages/${name}/src/components`
      ),
      createDirectoryPromise(`force-app/main/default/staticresources/${name}`)
    ]).then(() => 
      writeToFiles(files)
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
