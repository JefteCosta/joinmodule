import { test } from '@japa/runner'
import { createJoinModule, AppInstance} from '../../src/index.js'
import path from 'path'
test.group('JoinModules', () => {
  test('Includes news foders', async ({ assert }) => {

    const joinModule = createJoinModule({ 
      cwd: path.resolve(process.cwd(), 'examples', 'app'), 
      logging: { 
        loggingType: 'console', 
        verbose: true, 
        logger: console 
      } 
    }
    );
    const app: AppInstance = {}
    await joinModule.include('libs')
    .include('controllers')
    .include('http')
    .exclude('services')
    .into(app).then(() => {console.log('carregado o modulo app:', app)});
    const auth = await app.http.controllers.auth_controller.AuthController()
    assert.equal(auth, 'Auth controller')
  })
})