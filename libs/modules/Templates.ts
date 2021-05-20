import inquirer from 'inquirer'

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
  eslintrcJson: '.eslintrc.json'
} as const
type templateList = typeof templateList[keyof typeof templateList]

export default class Templates {
  #defaultChecked: templateList[] = [
    templateList.editorConfig,
    templateList.gitignore,
    templateList.browserslistrc,
    templateList.prettierrc,
    templateList.eslintrcYml
  ]

  public async exec(): Promise<number | void> {
    const choices = await this.#choices()
    if (typeof choices === 'number') return 1

    const confirm = await this.#confirm()
    if (typeof confirm === 'number') return 1

    // Re choices
    if (!confirm) {
      const [res] = await Promise.all([this.exec()])
      return res
    }

    return
  }

  /** Select templates */
  #choices = async (): Promise<number | void> => {
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
      eslintrcJson
    } = templateList

    try {
      const res = await inquirer.prompt<{ templates: templateList[] }>([
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
            }
          ]
        }
      ])

      this.#updateChecked(res.templates)
      return
    } catch (e) {
      console.error(e)
      return 1
    }
  }

  /** Are you sure you want to use the template you selected? */
  #confirm = async (): Promise<boolean | number> => {
    try {
      const res = await inquirer.prompt<{ confirm: boolean }>({
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to create this?',
        default: true
      })

      return res.confirm
    } catch (e) {
      console.error(e)
      return 1
    }
  }

  #updateChecked = (checked: templateList[]): void => {
    this.#defaultChecked = checked
  }

  #setBool = (key: templateList): boolean => {
    return this.#defaultChecked.includes(key)
  }
}
