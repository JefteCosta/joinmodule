import { Plugin } from './Plugin.ts';

export interface PluginManagerOptions {
  register(plugin: Plugin): void;
  applyAll(): void;
}