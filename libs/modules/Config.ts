import fs from 'fs'
import { bold, green } from 'kleur'
import os from 'os'
import { BaseModules } from '~/libs/modules/BaseModules'
import { templateList } from '~/libs/modules/Templates'

interface IfConfigFile {
  choices: templateList[]
}

export default class Config extends BaseModules {
  readonly #choiceDataFile = `${os.homedir()}/.preset-setup-files-config.json`
  readonly #choices?: templateList[]

  constructor() {
    super()

    if (!fs.existsSync(this.#choiceDataFile)) return

    const { choices }: IfConfigFile = JSON.parse(
      fs.readFileSync(this.#choiceDataFile, 'utf8')
    )

    this.#choices = choices
  }

  public existChoices(): templateList[] | undefined {
    return this.#choices
  }

  public saveChoices(choices: templateList[]): void {
    const obj = {
      choices
    }
    try {
      fs.writeFileSync(this.#choiceDataFile, JSON.stringify(obj))
      console.log(
        green('Create a config file into ') + bold().blue(this.#choiceDataFile)
      )
    } catch (e) {
      this.exit(e)
    }
  }
}
