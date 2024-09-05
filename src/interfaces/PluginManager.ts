import { Plugin } from '#interfaces/Plugin';

export interface PluginManager {
  register(plugin: Plugin): void;
  applyAll(): void;
}