import { configure, processCLIArgs, run } from '@japa/runner'
import { assert } from '@japa/assert'
import { expectTypeOf } from '@japa/expect-type'


processCLIArgs(process.argv.splice(2))
configure({
  suites: [
    {
      name: 'unit',
      files: ['tests/unit/**/*.spec.ts'],
    }
  ],
  plugins: [
    assert(),
    expectTypeOf()
  ],
})

run()