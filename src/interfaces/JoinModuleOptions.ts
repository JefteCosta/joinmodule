import type { FileHandlingOptions } from '#interfaces/FileHandlingOptions';
import type { LoggingOptions } from '#interfaces/LoggingOptions';
import type { Plugin } from '#interfaces/Plugin';

export interface JoinModuleOptions extends LoggingOptions, FileHandlingOptions {
  locale?: string;
  verbose?: boolean;
  extensions?: string[];
  logging: LoggingOptions;
  plugins?: Plugin[];
}


