import { Plugin } from './Plugin';

export interface PluginManagerOptions {
  register(plugin: Plugin): void;
  applyAll(): void;
}