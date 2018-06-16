import { flags, Command } from '@oclif/command'
import { core, SfdxCommand } from '@salesforce/command'
import {
  getTemplateBabelConfig,
  getTemplatePackageJsonConfig,
  getTemplateWebpackConfig,
  getTemplateIndex,
  getTemplateApp,
  getTemplateIndexHtml,
  getTemplateResourceMetadata,
  getTemplatePageMetadata
} from '../../helper/templates'

// Libraries
const FS = require('fs')
const Util = require('util')
const createDirectoryPromise = Util.promisify(require('mkdirp'))
const writeFilePromise = Util.promisify(FS.writeFile)
const writeToFile = (filePath: string, contents: string) => (
  writeFilePromise(filePath, contents).then(() => `${filePath} created`)
)
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

    // Load templates
    const templateBabelConfig = getTemplateBabelConfig()
    const templatePackageJsonConfig = getTemplatePackageJsonConfig(name)
    const templateWebpackConfig = getTemplateWebpackConfig(name)
    const templateIndex = getTemplateIndex()
    const templateApp = getTemplateApp()
    const templateIndexHtml = getTemplateIndexHtml(name)
    const templateResourceMetadata = getTemplateResourceMetadata(name)
    const templatePageMetadata = getTemplatePageMetadata(name)

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
