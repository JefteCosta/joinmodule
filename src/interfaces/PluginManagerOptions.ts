import { Plugin } from '#interfaces/Plugin';

export interface PluginManagerOptions {
  register(plugin: Plugin): void;
  applyAll(): void;
}