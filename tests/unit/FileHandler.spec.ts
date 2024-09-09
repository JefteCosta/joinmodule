import { test } from '@japa/runner'
import { FileHandler, Logger } from '#src/index'
import * as path from 'path'

test.group('JoinModuleFiles', () => {
  test('should it verify files', async ({ expect }) => {
    const filesLocals = new FileHandler({ cwd: process.cwd(), extensions: ['.ts'] }, new Logger({ loggingType: 'console', verbose: true, logger: console }));
    
    const iFile = await filesLocals.locations(process.cwd(), 'src', true);
    let app: object= {};
    const load = await filesLocals.loadDirectory(path.resolve(process.cwd(), 'examples'), app);
    const files = filesLocals.getFiles()
    expect(filesLocals).toBeTruthy();
    expect(iFile.includesDir).toContain(path.resolve(process.cwd(), 'src'));
    expect(files[0].fullPath).toContain('.ts');

  });
});