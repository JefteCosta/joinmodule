import * as fs from 'fs';
import path from 'path';

import { FileHandlingOptions } from '#interfaces/FileHandlingOptions';

export class FileHandler {
  constructor(private options: FileHandlingOptions) {}

  setLocations(parent: string, entity: string, push: boolean): string[] {
    // Implementação da lógica de manipulação de arquivos
    const files: string[] = [];
    // ...
    return files;
  }
}