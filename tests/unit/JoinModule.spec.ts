

import { test } from '@japa/runner'
import { createJoinModule, type AppInstance } from '#src/index';
import * as path from 'path';

test.group('JoinModule', () => {
//   test('should include files correctly', async ({ expect }) => {
//     const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: false, logger: console } });

//     joinModule.include('src');
//     // console.log(joinModule)
//     expect(joinModule).toBeTruthy();
//   });

  test('should exclude files correctly', async ({ expect }) => {
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
    .into(app);
    

    // console.log('app', app);
    const auth = await app.http.controllers.auth_controller.AuthController()
    expect(joinModule).toBeTruthy();
    expect(auth).toContain('Auth controller');
  });
});