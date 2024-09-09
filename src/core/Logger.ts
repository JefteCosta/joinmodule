
import { LoggingOptions } from '#interfaces/LoggingOptions';
import fs from 'fs';

export class Logger {
    private verbose: boolean;
    private logFileStream: fs.WriteStream | null = null;

    constructor(private options: LoggingOptions) {
        this.verbose = options.verbose || false;
        if (options.loggingType === 'file' && options.logFilePath) {
            this.logFileStream = fs.createWriteStream(options.logFilePath, { flags: 'a' });
        }
    }
    
    log(message: string[], type: 'info' | 'warn' | 'error' = 'info'): void {
        const logMessage = `${new Date().toISOString()} [${type.toUpperCase()}] ${message.join(' ')}`;
        if (this.options.verbose) {
            this.options.logger![type](logMessage);
        }
        if (this.logFileStream) {
            this.logFileStream.write(logMessage + '\n');
        }
    }
    close(): void {
        if (this.logFileStream) {
            this.logFileStream.end();
        }
    }
    info(message: string): void {
        if (this.verbose) {
          console.log(`INFO: ${message}`);
        }
      }
    
    error(message: string): void {
        if (this.verbose) {
            console.error(`ERROR: ${message}`);
        }
    }
}