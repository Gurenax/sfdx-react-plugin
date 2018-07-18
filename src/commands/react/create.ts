import { flags, Command } from '@oclif/command'
import { core, SfdxCommand } from '@salesforce/command'
import {
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
  core.SfdxUtil.writeFile(filePath, contents).then(() => `${filePath}`)
)
const writeToFiles = (files: File[]): Promise<any> => (
  Promise.all(
    files.map(element => writeToFile(element.key, element.value))
  ).then(result => result)
)

// Update Command
export default class Create extends SfdxCommand {
  public static examples = [
    `$ sfdx react:create -n HelloWorld -u OrgName`,
    `$ sfdx react:create -n HelloWorld -u OrgName --apiversion 43.0`,
  ]

  // For Usage help text
  // public static args = [{ name: 'file' }]

  // Option: if using Heroku CLI Command instead of SfdxCommand
  // static flags = {
  //   help: flags.help({ char: 'h' }),
  //   name: flags.string({
  //     char: 'n',
  //     description: 'name of the app',
  //     required: true
  //   })
  // }

  protected static flagsConfig = {
    // flag for help (-h, --help)
    help : { char: 'h', description: 'display the help texts' },
    // flag with a value (-n, --name=VALUE)
    name: { char: 'n', type: 'string', description: 'name of the app' },
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false

  public async run(): Promise<any> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    // tslint:disable-line:no-any
    // const { flags } = this.parse(Create) // Option: if using Heroku CLI Command instead of SfdxCommand
    const name = this.flags.name
    
    // Get api version
    const apiVersion = this.flags.apiversion || '43.0'

    // The type we are querying for
    interface Organization {
      Name: string;
      TrialExpirationDate: string;
    }

    // Query the org
    const query = 'Select Name, TrialExpirationDate from Organization';
    const result = await conn.query<Organization>(query);

    // Organization always only returns one result
    const orgName = result.records[0].Name;
    const trialExpirationDate = result.records[0].TrialExpirationDate;

    // Load templates
    const templateBabelConfig = getTemplateBabelConfig()
    const templatePackageJsonConfig = getTemplatePackageJsonConfig(name)
    const templateWebpackConfig = getTemplateWebpackConfig(name)
    const templateIndex = getTemplateIndex()
    const templateApp = getTemplateApp(name, apiVersion, orgName, trialExpirationDate)
    const templateCSS = getTemplateCSS()
    const templateLogo = getTemplateLogo()
    const templateIndexHtml = getTemplateIndexHtml(name)
    const templateTestHtml = getTemplateTestHtml(name)
    const templateResourceMetadata = getTemplateResourceMetadata(name)
    const templatePageMetadata = getTemplatePageMetadata(name, apiVersion)

    // Create key-value pair of filename and file path
    const files:File[] = [
      { key: `package.json`, value: templatePackageJsonConfig },
      { key: `webpack.config.js`, value: templateWebpackConfig },
      { key: `.babelrc`, value: templateBabelConfig },
      { key: `react/${name}/src/index.js`,
        value: templateIndex },
      { key: `react/${name}/src/components/App.js`,
        value: templateApp },
      { key: `react/${name}/src/components/App.css`,
        value: templateCSS },
      { key: `react/${name}/src/components/logo.svg`,
        value: templateLogo },
      { key: `force-app/main/default/pages/${name}.page`,
        value: templateIndexHtml },
      { key: `react/${name}.test.html`,
        value: templateTestHtml },
      { key: `force-app/main/default/staticresources/${name}.resource-meta.xml`,
        value: templateResourceMetadata },
      { key: `force-app/main/default/pages/${name}.page-meta.xml`,
        value: templatePageMetadata }
    ]

    return Promise.all([
      createDirectoryPromise(`react/${name}/src/components`),
      createDirectoryPromise(`force-app/main/default/pages/`),
      createDirectoryPromise(`force-app/main/default/staticresources/${name}`)
    ]).then(() => 
      writeToFiles(files)
        .then(results => {
          // Output file creation
          this.ux.log('Files created:', JSON.stringify(results))
        })
        .then(async () => {
          // Install packages
          this.ux.log('Installing packages...')
          try {
            const { stdout, stderr } = await exec(`yarn install`)
            this.ux.log(stdout)
            this.ux.log(stderr)
          } catch(error) {
            this.ux.log(error.stdout)
          }
        })
        .then(async () => {
          // Run webpack
          this.ux.log('Building app...')
          try {
            const { stdout, stderr } = await exec(`yarn build`)
            this.ux.log(stdout)
            this.ux.log(stderr)
          } catch(error) {
            this.ux.log(error.stdout)
          }
        }) 
    )
  }
}
