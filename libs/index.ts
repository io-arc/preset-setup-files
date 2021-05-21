import { program } from 'commander'
import { green, red } from 'kleur'
import updateNotifier from 'update-notifier'
import Templates from '~/libs/modules/Templates'
import { name, version } from '../package.json'
;(async (): Promise<void> => {
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
    .option(
      '--custom',
      'Customize default choices and copy directories.',
      false
    )
    .parse(process.argv)

  const template$ = new Templates()

  const exit = (): void => {
    console.log(red('Oops X('))
    process.exit(1)
  }

  // choices
  const choices = async (): Promise<void> => {
    const res = await template$.choices()
    if (res != null) exit()
  }

  // copy
  const copy = async (): Promise<void> => {
    const copied = await template$.copy()
    if (copied != null) exit()
  }

  await choices()
  await copy()

  process.exit(0)
})()
