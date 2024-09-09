import { apiClient } from '@japa/api-client'
import { browserClient } from '@japa/browser-client'
import { expect } from '@japa/expect'
import { expectTypeOf } from '@japa/expect-type'
import { fileSystem } from '@japa/file-system'
import { configure, processCLIArgs, run } from '@japa/runner'
import { snapshot } from '@japa/snapshot'
import { register } from 'node:module'

register('ts-node/esm', import.meta.url)

processCLIArgs(process.argv.splice(2))
configure({
  suites: [
    {
      name: 'unit',
      files: ['tests/unit/**/*.spec.ts'],
    }
  ],
  plugins: [
    expect(),
    apiClient('http://localhost:3333'),
    // fileSystem(),
    expectTypeOf(),
    snapshot(),
    browserClient({ runInSuites: ['browser'] }),
  ],
})

run()