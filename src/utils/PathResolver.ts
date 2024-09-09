import path from 'path';

export class PathResolver {
  /**
   * Resolve um caminho absoluto para o arquivo ou diretório a partir de uma base.
   * @param basePath Caminho base a partir do qual resolver o caminho.
   * @param relativePath Caminho relativo a ser resolvido.
   * @returns O caminho absoluto resolvido.
   */
  static resolvePath(basePath: string, relativePath: string): string {
    return path.resolve(basePath, relativePath);
  }

  /**
   * Obtém a extensão de um arquivo.
   * @param filePath Caminho completo do arquivo.
   * @returns Extensão do arquivo, incluindo o ponto (e.g., `.ts`, `.json`).
   */
  static getFileExtension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Retorna o nome do arquivo (sem o diretório) de um caminho completo.
   * @param filePath Caminho completo do arquivo.
   * @returns Nome do arquivo.
   */
  static getFileName(filePath: string): string {
    return path.basename(filePath);
  }

  /**
   * Retorna o nome do arquivo sem a extensão.
   * @param filePath Caminho completo do arquivo.
   * @returns Nome do arquivo sem a extensão.
   */
  static getFileNameWithoutExtension(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }
}
