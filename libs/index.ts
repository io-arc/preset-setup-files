import { program } from 'commander'
import updateNotifier from 'update-notifier'
import { name, version } from '../package.json'

// Library update
updateNotifier({ pkg: { name, version } }).notify()

// Command
program.version(version)
