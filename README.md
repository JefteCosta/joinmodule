# joinmodule
Autoload your scripts with TypeScript support.

## Descrição

`JoinModule` é uma ferramenta de carregamento de módulos projetada para facilitar o gerenciamento de arquivos em projetos Node.js, com suporte a plugins, logs e configurações para múltiplos ambientes.

## Instalação

```bash
npm install joinmodule
```
## Uso Básico
```javascript
import { createJoinModule } from 'joinmodule';

const joinModule = createJoinModule({ cwd: process.cwd(), logging: { loggingType: 'console', verbose: true, logger: console } });

joinModule.include('controllers').exclude('controllers/secret').then(() => {
  joinModule.into({});
});
```

### Conclusão

O `JoinModule` agora é um projeto robusto e extensível, pronto para ser utilizado em diversos cenários. Ele inclui melhorias significativas em segurança, modularidade, usabilidade e suporte a extensões. Com a adição de uma documentação clara e testes automatizados, ele se torna uma ferramenta confiável e intuitiva para desenvolvedores que buscam gerenciar módulos de forma eficaz em seus projetos Node.js. 

Além disso, o design do projeto permite fácil manutenção e extensão, incentivando contribuições da comunidade e a criação de plugins que podem adicionar funcionalidades adicionais, tornando o `JoinModule` ainda mais poderoso e flexível.