import { JoinModule } from './core/JoinModule.js';
import { JoinModuleOptions } from './interfaces/JoinModuleOptions.js';
export * from './interfaces/JoinModuleOptions.js';
export * from './interfaces/FileHandlingOptions.js';
export * from './interfaces/LoggingOptions.js';
export * from './interfaces/Plugin.js';
export * from './interfaces/PluginManagerOptions.js';
export * from './core/Logger.js';
export * from './core/FileHandler.js';
export * from './core/PluginManager.js';
export * from './core/JoinModule.js';


export function createJoinModule(options: JoinModuleOptions) {
  return new JoinModule(options);
}