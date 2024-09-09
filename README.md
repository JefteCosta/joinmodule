# joinmodule
Autoload your scripts with TypeScript support.

## Descrição

`JoinModule` é uma ferramenta de carregamento de módulos projetada para facilitar o gerenciamento de arquivos em projetos Node.js, com suporte a plugins, logs e configurações para múltiplos ambientes.

## Instalação

```bash
npm install joinmodule

```javascript
import createJoinModule from 'joinmodule';

const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: true, logger: console } });

joinModule.include('controllers').exclude('controllers/secret').then(() => {
  joinModule.into({});
});
