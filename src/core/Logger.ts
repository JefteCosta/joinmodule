
import { LoggingOptions } from '#interfaces/LoggingOptions';
import fs from 'fs';

export class Logger {
  private logFileStream: fs.WriteStream | null = null;

  constructor(private options: LoggingOptions) {
    if (options.loggingType === 'file' && options.logFilePath) {
      this.logFileStream = fs.createWriteStream(options.logFilePath, { flags: 'a' });
    }
  }

  log(message: string[], type: 'info' | 'warn' | 'error' = 'info'): void {
    const logMessage = `${new Date().toISOString()} [${type.toUpperCase()}] ${message.join(' ')}`;
    if (this.options.verbose) {
      this.options.logger[type](logMessage);
    }
    if (this.logFileStream) {
      this.logFileStream.write(logMessage + '\n');
    }
  }
