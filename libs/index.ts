import { program } from 'commander'
import { green, red } from 'kleur/colors'
import updateNotifier from 'update-notifier'
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
program.version(version)

const exit = (): void => {
  console.log(red('Oops X('))
  process.exit(1)
}

/** exec */
;(async (): Promise<void> => {
  const templates = new Templates()
  const choices = await templates.choices()

  if (choices != null) {
    exit()
    return
  }

  console.log('complete')
})()
