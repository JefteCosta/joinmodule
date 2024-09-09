import type { FileHandlingOptions, CIFileHandler, LocationsReturn } from '#interfaces/FileHandlingOptions';
import { Logger } from '#src/core/Logger';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url'

export type File = {
    fullPath: string;
    pathUrl: string;
    tag: object;
}   

export class FileHandler implements CIFileHandler {
    options: FileHandlingOptions;
    files: string[] = [];
    private directories: string[] = [];
    private includesDir: string[] = [];
    private excludesDir: string[] = [];
    private FilesArray: Array<File> = [];
    logger: Logger;

    constructor(options: FileHandlingOptions, logger: Logger) {
        this.options = options;
        this.logger = logger;
    }

    // Async function to check if a file or directory exists
    /**
   * verifica se o arquivo existe dentro da pasta ou se a pasta existe.
   * @param filePath caminho do arquivo.
   * 
   */
    async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.promises.access(filePath);
            return true;
        } catch (err) {
            this.logger.error(`File or directory not found: ${filePath}`);
            return false;
        }
    }

    // Read directory contents and return file paths
    /**
   * Carrega recursivamente os arquivos de um diretório e injeta no target.
   * @param dirPath Diretório a ser carregado.
   */
    async readDirectory(dirPath: string): Promise<string[]> {
        try {
            const files = await fs.promises.readdir(dirPath);
            return files.map((file) => path.join(dirPath, file));
        } catch (err) {
            this.logger.error(`Failed to read directory: ${dirPath}`);
            throw err;
        }
    }
    getFiles(): Array<object> {
        for (const file of this.FilesArray) {
            this.files.push(file.fullPath);
        }
        return this.FilesArray;
    }
    async locations(parent: string, entity: string, load: boolean): Promise<LocationsReturn>{
        const location = path.resolve(parent, entity);
        if(load){
            if(!this.includesDir.includes(location)){
                this.includesDir.push(location);
            }
        }else{
            if(!this.includesDir.includes(location)){
                this.excludesDir.push(location);
            }
        }
        
        const filesLocals = {
            includesDir: this.includesDir,
            excludesDir: this.excludesDir,
        }
        return filesLocals;
    }
    /**
   * Carrega recursivamente os arquivos de um diretório e injeta no target.
   * @param directory Diretório a ser carregado.
   * @param target Objeto de destino.
   */
    async loadDirectory(directory: string, target: any): Promise<void> {
        const items = await fs.promises.readdir(directory);
        
        for (const item of items) {
            const fullPath = path.join(directory, item);
            const stat = await fs.promises.stat(fullPath);

            // Verifica se deve excluir o diretório ou arquivo
            if (this.isExcluded(fullPath)) {
                if (this.options.verbose) {
                this.logger.info(`Excluído: ${fullPath}`);
                }
                continue;
            }

            if (stat.isDirectory()) {
                this.directories.push(fullPath);
                await this.loadDirectory(fullPath, target);
            } else if (this.isValidExtension(item)) {

                const url = pathToFileURL(fullPath).href;
                await this.loadFile(url, target);
            }
        }
    }

    /**
   * Carrega um arquivo e injeta no target.
   * @param filePath Caminho completo do arquivo.
   * @param target Objeto de destino.
   */
    private async loadFile(filePath: string, target: any): Promise<void> {
        try {
            const modulePath = fileURLToPath(filePath);
            const module = await import(filePath);
            const exported = module.default || module;
            const file = {
                fullPath: modulePath, 
                pathUrl: filePath, 
                tag:target
            }
            this.FilesArray.push(file);
            // Define o namespace com base no caminho relativo
            const relativePath = path.relative(this.options.cwd!, modulePath);
            const namespaceParts = relativePath.split(path.sep);
            
            // Remove a extensão do último elemento
            namespaceParts[namespaceParts.length - 1] = path.basename(
                namespaceParts[namespaceParts.length - 1],
                path.extname(namespaceParts[namespaceParts.length - 1])
            );

            this.createNamespace(target, namespaceParts, exported);
            if (this.options.verbose) {
                this.logger.info(`Injetado módulo: ${filePath}`);
            }
        } catch (error) {
            if (this.options.verbose) {
                this.logger.error(`Erro ao carregar arquivo: ${filePath}`);
            }
            throw error;
        }
    }
    /**
     * Cria um namespace no target baseado nos diretórios.
     * @param parent Objeto pai onde o namespace será criado.
     * @param parts Partes do caminho para criar o namespace.
     * @param mod Módulo a ser injetado.
    */
    private createNamespace(parent: any, parts: string[], mod: any): void {
        const part = parts.shift()!;
        if (parts.length === 0) {
          // Último nível, atribui o módulo
          parent[part] = mod;
        } else {
          // Continua criando o namespace
          if (!parent[part]) {
            parent[part] = {};
          }
          this.createNamespace(parent[part], parts, mod);
        }
      }
    
    /**
    * Verifica se a extensão do arquivo é válida para inclusão.
    * @param file Nome do arquivo.
    * @returns Booleano indicando se a extensão é válida.
    */
    private isValidExtension(file: string): boolean {
        return this.options.extensions!.includes(path.extname(file));
    }

    /**
    * Verifica se o caminho está na lista de exclusões.
    * @param fullPath Caminho completo do arquivo ou diretório.
    * @returns Booleano indicando se está excluído.
    */
    private isExcluded(fullPath: string): boolean {
        return this.excludesDir.some((excludePath) => {
        return fullPath.startsWith(excludePath);
        });
    }
}
