import { Plugin } from '#interfaces/Plugin';
import { JoinModule } from '#src/core/JoinModule';

export class CustomPlugin implements Plugin {
  apply(joinModule: JoinModule): void {
    console.log('CustomPlugin applied!');
  }

  async applyAsync(joinModule: JoinModule): Promise<void> {
    console.log('CustomPlugin async applied!');
  }
}

