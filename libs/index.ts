import { OptionValues, program } from 'commander'
import { bold, gray, green } from 'kleur'
import updateNotifier from 'update-notifier'
import Config from '~/libs/modules/Config'
import Templates from '~/libs/modules/Templates'
import { name, version } from '../package.json'

/** checking library update */
updateNotifier({ pkg: { name, version } }).notify()

/** end command */
process.stdin.resume()
process.on('SIGINT', (): void => {
  console.log(green('Bye !'))
  process.exit(0)
})

/** library command */
program
  .version(version)
  .option('--custom', 'Customize default choices and copy directories.', false)
  .option('-c, --config', 'Current settings', false)
  .parse(process.argv)

/** exec */
;(async ({ custom, config }: OptionValues): Promise<void> => {
  const config$ = new Config()
  const template$ = new Templates(config$.templateDir(), config$.existChoices())

  // Show config
  if (config) {
    console.log(bold().blue('=== Current settings ==='))
    console.log(
      `Default choices: ${bold().green(template$.items().join(', '))}`
    )
    console.log(`Templates directory: ${bold().green(config$.templateDir())}`)

    const configFile = config$.existsFile()
      ? bold().green(config$.file())
      : gray('No exists')
    console.log(`Config file: ${configFile}`)

    process.exit(0)
    return
  }

  // Initialize Mode
  if (custom) {
    console.log(bold().blue('=== Custom settings ==='))
    await template$.choices()
    await config$.setTemplateDir()
    config$.save(template$.items())
    process.exit(0)
    return
  }

  await template$.choices()
  await template$.copy()

  process.exit(0)
})(program.opts())
