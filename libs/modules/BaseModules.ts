import { red } from 'kleur'

export class BaseModules {
  protected exit(error?: Error): void {
    console.log(red('Oops X('))
    if (error) {
      console.log(red(JSON.stringify(error)))
    }
    process.exit(1)
  }
}
