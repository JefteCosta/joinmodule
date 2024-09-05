import fs from 'fs';
import path from 'path';
import { JoinModuleOptions } from '#interfaces/JoinModuleOptions';
import { Logger } from '#src/core/Logger';
import { PluginManager } from '#src/core/PluginManager';

export class JoinModule {
  private files: string[] = [];
  private logger: Logger;
  private pluginManager: PluginManager;

  constructor(private options: JoinModuleOptions) {
    this.logger = new Logger(options.logging);
    this.pluginManager = new PluginManager();
    this.logger.log(['JoinModule initialized in', options.cwd]);

    if (options.plugins) {
      options.plugins.forEach(plugin => this.pluginManager.register(plugin));
    }
  }

  include(entity: string): this {
    this.setLocations(this.options.cwd, entity, true);
    return this;
  }

  exclude(entity: string): this {
    this.setLocations(this.options.cwd, entity, false);
    return this;
  }

  async into(target: object): Promise<void> {
    await Promise.all(this.files.map(async file => {
      const mod = await import(file);
      this.createNamespace(target, path.basename(file, path.extname(file)), mod);
    }));
    await this.pluginManager.applyAllAsync(this);
  }

  private setLocations(parent: string, entity: string, include: boolean): void {
    const location = path.resolve(parent, entity);
    if (fs.existsSync(location)) {
      if (include) {
        this.files.push(location);
        this.logger.log(['Included', location]);
      } else {
        this.files = this.files.filter(file => file !== location);
        this.logger.log(['Excluded', location]);
      }
    } else {
      this.logger.log(['Entity not found:', location], 'warn');
    }
  }

  private createNamespace(target: object, name: string, mod: any): void {
    if (typeof mod === 'function') {
      target[name] = mod();
    } else {
      target[name] = mod;
    }
  }

  use(plugin: any): this {
    this.pluginManager.register(plugin);
    return this;
  }
}