import { Plugin } from '../interfaces/Plugin';
import { JoinModule } from './JoinModule';

export class PluginManager {
  private plugins: Plugin[] = [];

  register(plugin: Plugin): void {
    this.plugins.push(plugin);
  }

  applyAll(joinModule: JoinModule): void {
    this.plugins.forEach(plugin => plugin.apply(joinModule));
  }

  async applyAllAsync(joinModule: JoinModule): Promise<void> {
    for (const plugin of this.plugins) {
      await plugin.applyAsync?.(joinModule);
    }
  }
}