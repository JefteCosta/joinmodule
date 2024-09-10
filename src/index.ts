import { JoinModule } from './core/JoinModule';
import { JoinModuleOptions } from './interfaces/JoinModuleOptions';
export * from './interfaces/JoinModuleOptions';
export * from './interfaces/FileHandlingOptions';
export * from './interfaces/LoggingOptions';
export * from './interfaces/Plugin';
export * from './interfaces/PluginManagerOptions';
export * from './core/Logger';
export * from './core/FileHandler';
export * from './core/PluginManager';
export * from './core/JoinModule';


export function createJoinModule(options: JoinModuleOptions) {
  return new JoinModule(options);
}