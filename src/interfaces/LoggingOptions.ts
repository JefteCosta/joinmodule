export interface LoggingOptions {
    logger?: Console;
    verbose?: boolean;
    loggingType?: 'console' | 'file' | 'info' | 'error' | 'warn' | 'log';
    logFilePath?: string;
  }