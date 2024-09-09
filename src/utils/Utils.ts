export class Utils {
    /**
     * Valida se um valor está definido (não é null nem undefined).
     * @param value Valor a ser validado.
     * @returns true se o valor estiver definido, false caso contrário.
     */
    static isDefined<T>(value: T | undefined | null): value is T {
      return value !== undefined && value !== null;
    }
  
    /**
     * Remove duplicatas de um array.
     * @param array Array de valores (de qualquer tipo).
     * @returns Novo array sem duplicatas.
     */
    static removeDuplicates<T>(array: T[]): T[] {
      return [...new Set(array)];
    }
  
    /**
     * Formata uma string capitalizando a primeira letra.
     * @param text String a ser formatada.
     * @returns String com a primeira letra capitalizada.
     */
    static capitalizeFirstLetter(text: string): string {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  
    /**
     * Checa se um objeto está vazio (não possui propriedades próprias enumeráveis).
     * @param obj Objeto a ser verificado.
     * @returns true se o objeto estiver vazio, false caso contrário.
     */
    static isEmptyObject(obj: object): boolean {
      return Object.keys(obj).length === 0;
    }
  }
  