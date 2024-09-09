import { JoinModule } from '#src/core/JoinModule';
import { JoinModuleOptions } from '#interfaces/JoinModuleOptions';
export * from '#interfaces/JoinModuleOptions';
export * from '#interfaces/FileHandlingOptions';
export * from '#interfaces/LoggingOptions';
export * from '#interfaces/Plugin';
export * from '#interfaces/PluginManagerOptions';
export * from '#src/core/Logger';
export * from '#src/core/FileHandler';
export * from '#src/core/PluginManager';
export * from '#src/core/JoinModule';


export function createJoinModule(options: JoinModuleOptions) {
  return new JoinModule(options);
}