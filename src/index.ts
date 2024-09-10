import { JoinModule } from './core/JoinModule.ts';
import { JoinModuleOptions } from './interfaces/JoinModuleOptions.ts';
export * from './interfaces/JoinModuleOptions.ts';
export * from './interfaces/FileHandlingOptions.ts';
export * from './interfaces/LoggingOptions.ts';
export * from './interfaces/Plugin.ts';
export * from './interfaces/PluginManagerOptions.ts';
export * from './core/Logger.ts';
export * from './core/FileHandler.ts';
export * from './core/PluginManager.ts';
export * from './core/JoinModule.ts';


export function createJoinModule(options: JoinModuleOptions) {
  return new JoinModule(options);
}