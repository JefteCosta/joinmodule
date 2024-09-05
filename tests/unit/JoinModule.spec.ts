import { test } from '@japa/runner'
import createJoinModule from '#src/index';

test.group('JoinModule', () => {
  test('should include files correctly', async ({ expect }) => {
    const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: false, logger: console } });

    joinModule.include('src');
    
    expect(joinModule).toBeTruthy();
  });

  test('should exclude files correctly', async ({ expect }) => {
    const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: false, logger: console } });

    joinModule.include('src');
    joinModule.exclude('tests');
    
    expect(joinModule).toBeTruthy();
  });
});