import { program } from 'commander'
import { green } from 'kleur/colors'
import updateNotifier from 'update-notifier'
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
