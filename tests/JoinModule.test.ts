import {expect, it, describe} from '@jest/globals';
import createJoinModule from '../src';

describe('JoinModule', () => {
  it('should include files correctly', async () => {
    const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: false, logger: console } });

    joinModule.include('src');
    
    expect(joinModule).toBeTruthy();
  });

  it('should exclude files correctly', async () => {
    const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: false, logger: console } });

    joinModule.include('src');
    joinModule.exclude('tests');
    
    expect(joinModule).toBeTruthy();
  });
});