export interface FileHandlingOptions {
    cwd?: string;
    extensions?: string[];
    ignoreHiddenFiles?: boolean;
    verbose?: boolean;
  }
  export interface FilesLocationsReturn{
    files: string[];
    directories: string[];
}

  export interface CIFileHandler {
    options: FileHandlingOptions;
    logger: any;
    files: string[];
    


    fileExists(path: string): Promise<boolean>;
    getFiles(): Array<object>;
    locations(parent: string, entity: string, include: boolean): Promise<LocationsReturn>;
    readDirectory(parent: string, entity: string): Promise<string[]>;
    loadDirectory(parent: string, entity: string): Promise<void>;
    
  }
  export interface LocationsReturn{
    includesDir: string[];
    excludesDir: string[];

  }