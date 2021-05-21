import { program } from 'commander'
import { bold, green } from 'kleur'
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
  .parse(process.argv)

/** exec */
;(async ({ custom }): Promise<void> => {
  const config$ = new Config()
  const template$ = new Templates(config$.existChoices())

  // Initialize Mode
  if (custom) {
    console.log(bold().blue('=== Initialize default choices ==='))
    await template$.choices()
    config$.saveChoices(template$.items())
    process.exit(0)
  }

  await template$.choices()
  await template$.copy()

  process.exit(0)
})(program.opts())
