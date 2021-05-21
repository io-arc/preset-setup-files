import cpx from 'cpx'
import inquirer from 'inquirer'
import { green, red } from 'kleur'
import { BaseModules } from '~/libs/modules/BaseModules'

const templateList = {
  editorConfig: '.editorConfig',
  gitignore: '.gitignore',
  npmrc: '.npmrc',
  npmignore: '.npmignore',
  browserslistrc: '.browserslistrc',

  // prettier
  prettierrc: '.prettierrc',
  prettierrcJson: '.prettierrc.json',
  prettierrcJson5: '.prettierrc.json5',
  prettierrcYml: '.prettierrc.yml',
  prettierrcYaml: '.prettierrc.yaml',
  prettierrcJs: '.prettierrc.js',
  prettierrcCjs: '.prettierrc.cjs',
  prettierrcConfigJs: '.prettierrc.config.js',
  prettierrcConfigCjs: '.prettierrc.config.cjs',
  prettierrcToml: '.prettierrc.toml',

  // eslint
  eslintrcJs: '.eslintrc.js',
  eslintrcCjs: '.eslintrc.cjs',
  eslintrcYml: '.eslintrc.yml',
  eslintrcYaml: '.eslintrc.yaml',
  eslintrcJson: '.eslintrc.json',

  // eslint ignore
  eslintignore: '.eslintignore'
} as const
export type templateList = typeof templateList[keyof typeof templateList]

export default class Templates extends BaseModules {
  #checkedItem: templateList[] = [
    templateList.editorConfig,
    templateList.gitignore,
    templateList.browserslistrc,
    templateList.prettierrc,
    templateList.eslintrcYml
  ]

  readonly #templateDir: string

  constructor(templateDirectory: string, initChoices?: templateList[]) {
    super()
    console.log(templateDirectory)
    this.#templateDir = templateDirectory
    if (initChoices) this.#checkedItem = initChoices
  }

  public items(): templateList[] {
    return this.#checkedItem
  }

  /** Choice a templates */
  public async choices(): Promise<void> {
    const choices = await this.#checkbox()
    if (typeof choices === 'number') {
      this.exit()
      return
    }

    if (!choices.confirm) {
      const [res] = await Promise.all([this.choices()])
      return res
    }

    return
  }

  public async copy(): Promise<void> {
    try {
      const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>({
        type: 'confirm',
        name: 'overwrite',
        message: 'If the file has the same name, it will be overwritten.',
        default: false
      })

      const source = ((items): string => {
        const _ = items.join(',')
        if (items.length === 1) return _
        return `{${_}}`
      })(this.#checkedItem)

      cpx.copySync(`${this.#templateDir}/${source}`, '', {
        update: !overwrite
      })

      console.log(green('=== Files copy is done! ==='))
    } catch (e) {
      this.exit(e)
    }
  }

  /** Select templates */
  #checkbox = async (): Promise<{ confirm: boolean } | number> => {
    const {
      editorConfig,
      gitignore,
      npmrc,
      npmignore,
      browserslistrc,
      prettierrc,
      prettierrcJson,
      prettierrcJson5,
      prettierrcYml,
      prettierrcYaml,
      prettierrcJs,
      prettierrcCjs,
      prettierrcConfigJs,
      prettierrcConfigCjs,
      prettierrcToml,
      eslintrcJs,
      eslintrcCjs,
      eslintrcYml,
      eslintrcYaml,
      eslintrcJson,
      eslintignore
    } = templateList

    try {
      const res = await inquirer.prompt<{
        templates: templateList[]
        confirm: boolean
      }>([
        {
          type: 'checkbox',
          name: 'templates',
          message: 'Choice setup files',
          loop: false,
          // pageSize: 50,
          choices: [
            {
              value: editorConfig,
              checked: this.#setBool(editorConfig)
            },
            {
              value: gitignore,
              checked: this.#setBool(gitignore)
            },
            {
              value: npmrc,
              checked: this.#setBool(npmrc)
            },
            {
              value: npmignore,
              checked: this.#setBool(npmignore)
            },
            {
              value: browserslistrc,
              checked: this.#setBool(browserslistrc)
            },
            new inquirer.Separator(),
            // prettier
            {
              value: prettierrc,
              checked: this.#setBool(prettierrc)
            },
            {
              value: prettierrcJson,
              checked: this.#setBool(prettierrcJson)
            },
            {
              value: prettierrcJson5,
              checked: this.#setBool(prettierrcJson5)
            },
            {
              value: prettierrcYml,
              checked: this.#setBool(prettierrcYml)
            },
            {
              value: prettierrcYaml,
              checked: this.#setBool(prettierrcYaml)
            },
            {
              value: prettierrcJs,
              checked: this.#setBool(prettierrcJs)
            },
            {
              value: prettierrcCjs,
              checked: this.#setBool(prettierrcCjs)
            },
            {
              value: prettierrcConfigJs,
              checked: this.#setBool(prettierrcConfigJs)
            },
            {
              value: prettierrcConfigCjs,
              checked: this.#setBool(prettierrcConfigCjs)
            },
            {
              value: prettierrcToml,
              checked: this.#setBool(prettierrcToml)
            },
            new inquirer.Separator(),
            {
              value: eslintrcJs,
              checked: this.#setBool(eslintrcJs)
            },
            {
              value: eslintrcCjs,
              checked: this.#setBool(eslintrcCjs)
            },
            {
              value: eslintrcYml,
              checked: this.#setBool(eslintrcYml)
            },
            {
              value: eslintrcYaml,
              checked: this.#setBool(eslintrcYaml)
            },
            {
              value: eslintrcJson,
              checked: this.#setBool(eslintrcJson)
            },
            new inquirer.Separator(),
            // eslint ignore
            {
              value: eslintignore,
              checked: this.#setBool(eslintignore)
            },
            new inquirer.Separator()
          ]
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to create this?',
          default: true
        }
      ])

      this.#updateChecked(res.templates)
      return { confirm: res.confirm }
    } catch (e) {
      console.log(red(e))
      return 1
    }
  }

  #updateChecked = (checked: templateList[]): void => {
    this.#checkedItem = checked
  }

  #setBool = (key: templateList): boolean => {
    return this.#checkedItem.includes(key)
  }
}
