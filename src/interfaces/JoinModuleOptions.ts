import type { FileHandlingOptions } from './FileHandlingOptions.ts';
import type { LoggingOptions } from './LoggingOptions.ts';
import type { Plugin } from './Plugin.ts';

export interface JoinModuleOptions extends LoggingOptions, FileHandlingOptions {
    cwd?: string;
    locale?: string;
    verbose?: boolean;
    extensions?: string[];
    logging: LoggingOptions;
    plugins?: Plugin[];
}

  // Define os tipos base para os diferentes componentes do sistema

  // Tipo base para qualquer controlador
  export interface BaseController {
    [key: string]: (...args: any[]) => any;
  }

  // Tipo base para qualquer modelo
  export interface BaseModel {
    [key: string]: any;
  }

  // Tipo base para qualquer middleware
  export interface BaseMiddleware {
    (req: any, res: any, next: () => void): void;
  }

  // Tipo base para validadores
  export interface BaseValidator {
    validate(data: any): boolean;
  }

  // Tipo base para exceções
  export interface BaseException {
    message: string;
    statusCode: number;
    handle(): void;
  }

  // Tipo base para repositórios
  export interface BaseRepository {
    find(id: string | number): any;
    save(data: any): any;
    delete(id: string | number): any;
  }

  // Tipo base para providers (provedores de serviços)
  export interface BaseProvider {
    register(): void;
    boot(): void;
  }

  // Tipo base para observers (observadores)
  export interface BaseObserver {
    observer(event: string, callback: (...args: any[]) => void): void;
  }

  // Tipo base para serviços
  export interface BaseService {
    [key: string]: (...args: any[]) => any;
  }

  // Tipo base para jobs
  export interface BaseJob {
    run(data: any): Promise<void>;
  }

  // Tipo base para schedulers (agendadores)
  export interface BaseScheduler {
    schedule(cronExpression: string, task: () => void): void;
  }

  // Namespace genérico que pode incluir controllers, models, middlewares, etc.
  export interface Namespace<T> {
    [key: string]: T;
  }

  // Estrutura do JoinModule que aceita uma grande variedade de namespaces
  export interface CIJoinModule {

    /**
     * Inclui um diretório ou arquivo no carregamento do módulo.
     * @param path Caminho para o diretório ou arquivo a ser incluído.
     */
    include(path: string): this;

    /**
     * Exclui um diretório ou arquivo do carregamento do módulo.
     * @param path Caminho para o diretório ou arquivo a ser excluído.
     */
    exclude(path: string): this;

    /**
     * Injeta os arquivos incluídos em um objeto de destino, como controladores, serviços, etc.
     * @param target Objeto onde os módulos serão injetados.
     */
    into<T extends Namespace<any>>(target: T): Promise<this>;
  }

//   // Opções de configuração para o JoinModule
//   export interface JoinModuleOptions {
//     cwd?: string;
//     extensions?: string[];
//     verbose?: boolean;
//   }

  // Plugin para extensões adicionais
  export interface BasePlugin {
    name: string;
    init(joinModule: CIJoinModule): void;
  }

  // Definição de uma instância de aplicativo com vários namespaces
  export interface AppInstance {
    controllers?: Namespace<BaseController>;
    models?: Namespace<BaseModel>;
    middlewares?: Namespace<BaseMiddleware>;
    validators?: Namespace<BaseValidator>;
    exceptions?: Namespace<BaseException>;
    repositories?: Namespace<BaseRepository>;
    providers?: Namespace<BaseProvider>;
    observers?: Namespace<BaseObserver>;
    services?: Namespace<BaseService>;
    jobs?: Namespace<BaseJob>;
    schedulers?: Namespace<BaseScheduler>;
    [key: string]: any; // Para extensibilidade futura
  }

