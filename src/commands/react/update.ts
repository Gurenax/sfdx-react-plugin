import { flags, Command } from '@oclif/command'
import { core, SfdxCommand } from '@salesforce/command'

// Libraries
const Util = require('util')
const exec = Util.promisify(require('child_process').exec)

// Update command
export default class Update extends Command {
  public static examples = [`$ sfdx react:update`]

  static flags = {
    help: flags.help({ char: 'h' })
  }

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false

  public async run(): Promise<any> {
    // tslint:disable-line:no-any
    // Install packages
    this.log('Updating packages...')
    return exec(`yarn install`).then(async () => {
      // Run webpack
      this.log('Building app...')
      const { stdout, stderr } = await exec(`yarn build`)
      this.log(stdout)
      this.log(stderr)
    })
  }
}
