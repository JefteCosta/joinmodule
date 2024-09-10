import { Plugin } from './Plugin.js';

export interface PluginManagerOptions {
  register(plugin: Plugin): void;
  applyAll(): void;
}