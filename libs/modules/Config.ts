import fs from 'fs'
import inquirer from 'inquirer'
import { bold, gray, green } from 'kleur'
import os from 'os'
import path from 'path'
import { BaseModules } from '~/libs/modules/BaseModules'
import { templateList } from '~/libs/modules/Templates'

interface IfConfigFile {
  choices: templateList[]
  templateDirectory?: string
}

export default class Config extends BaseModules {
  readonly #choiceDataFile = `${os.homedir()}/.preset-setup-files-config.json`
  readonly #choices?: templateList[]
  readonly #isExist: boolean = false
  readonly #configTemplateDirectory?: string

  #templateDir = `${path.dirname(__filename)}/templates`
  #updateTemplateDir = false

  constructor() {
    super()

    if (!fs.existsSync(this.#choiceDataFile)) return

    this.#isExist = true
    const { choices, templateDirectory }: IfConfigFile = JSON.parse(
      fs.readFileSync(this.#choiceDataFile, 'utf8')
    )

    this.#choices = choices
    if (templateDirectory) {
      this.#configTemplateDirectory = templateDirectory
      this.#templateDir = templateDirectory
    }
  }

  public file(): string {
    return this.#choiceDataFile
  }

  public existsFile(): boolean {
    return this.#isExist
  }

  public templateDir(): string {
    return this.#templateDir
  }

  public existChoices(): templateList[] | undefined {
    return this.#choices
  }

  public async setTemplateDir(): Promise<void> {
    try {
      const { dir } = await inquirer.prompt<{ dir: string }>([
        {
          type: 'input',
          name: 'dir',
          default: this.#configTemplateDirectory || '',
          message: 'Using custom templates directory path',
          suffix: `\n${gray(
            `Leave it empty if you want to use the default.
Use Backspace to delete the path if it exists.`
          )}`
        }
      ])

      if (dir !== '') {
        this.#templateDir = dir.replace(/\/$/, '')
        this.#updateTemplateDir = true
      }
    } catch (e) {
      this.exit(e)
    }
  }

  public save(choices: templateList[]): void {
    const obj: IfConfigFile = {
      choices
    }

    if (this.#updateTemplateDir) {
      obj.templateDirectory = this.#templateDir
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
