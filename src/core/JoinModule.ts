import type { JoinModuleOptions, CIJoinModule, Namespace } from '#interfaces/JoinModuleOptions';
import { FileHandler } from '#src/core/FileHandler';
import { Logger } from '#src/core/Logger';
import { PluginManager } from '#src/core/PluginManager';
import * as path from 'path';
import * as fs from 'fs';

export class JoinModule implements CIJoinModule {
    private options: JoinModuleOptions;
    private fileHandler: FileHandler;
    private logger: Logger;
    private includes: string[] = [];
    private excludes: string[] = [];
    private files: string[] = [];
    private pluginManager: PluginManager;

    constructor(options: JoinModuleOptions) {
        const defaultExtensions = ['.ts', '.js'];
        this.options = { 
            cwd: options.cwd ? options.cwd : process.cwd(), 
            extensions: options.extensions ?  options.extensions : defaultExtensions, 
            ...options 
        };
        this.logger = new Logger(options.logging);
        this.fileHandler = new FileHandler({cwd: this.options.cwd, extensions: this.options.extensions }, this.logger);
        this.pluginManager = new PluginManager();
        this.logger.log(['JoinModule initialized in', options.cwd!]);
        // console.log('options', options)
        if (options.plugins) {
            options.plugins.forEach(plugin => this.pluginManager.register(plugin));
        }
    }
    private async setLocations(parent: string, entity: string, include: boolean): Promise<void>{
        const location = path.resolve(parent, entity);
        
        if (fs.existsSync(location)) {
           
                if (include) {
                    this.fileHandler.locations(parent, entity, include);
                    this.files.push(location);
                    this.logger.log(['Included', location]);
                } else {
                    this.fileHandler.locations(parent, entity, include);
                    this.files = this.files.filter(file => file !== location);
                    this.logger.log(['Excluded', location]);
                }

            
        } else {
        this.logger.log(['Entity not found:', location], 'warn');
        }
        
    }
    /**
     * Inclui um diretório para ser carregado.
     * @param directory Diretório a ser incluído.
     */
    include(directory: string): this {
        
        this.setLocations(this.options.cwd!, directory, true);

        const fullPath = path.resolve(this.options.cwd!, directory);

        if (!this.includes.includes(fullPath)) {
            this.includes.push(fullPath);
            if (this.options.verbose) {
                this.logger.info(`Incluído diretório: ${fullPath}`);
            }
        }
        return this;
    }
    /**
   * Exclui um diretório ou arquivo de ser carregado.
   * @param target Diretório ou arquivo a ser excluído.
   */
    exclude(target: string): this {
        this.setLocations(this.options.cwd!, target, false);
        const fullPath = path.resolve(this.options.cwd!, target);
        if (!this.excludes.includes(fullPath)) {
            this.excludes.push(fullPath);
        }
        return this;
    }
    /**
   * Injeta os módulos carregados no objeto de destino.
   * @param target Objeto de destino (por exemplo, app do Express).
   */
    async into<T extends Namespace<any>>(target: T): Promise<this> {
        try {
            for (const directory of this.includes) {
              await this.fileHandler.loadDirectory(directory, target);
            }
            if (this.options.verbose) {
              this.logger.info('Todos os módulos foram injetados com sucesso.');
            }
          } catch (error) {
            if (this.options.verbose) {
              this.logger.error('Erro ao injetar módulos:');
            }
            throw error;
          }
          return this;
    }
    

    use(plugin: any): this {
        this.pluginManager.register(plugin);
        return this;
    }
 
}
