# Pokedex-TypeScript-Lite
Pokedex TypeScript Lite é uma aplicação em Node.js com TypeScript criado para o Mini-Projeto Avaliativo para o curso de Back-end

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação em Node.js com TypeScript criado para o Mini-Projeto Avaliativo para o curso de Back-end.

A aplicação faz consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/docs/v2), transforma a resposta em um objeto simplificado e organiza os resultados em um catálogo local, mantido em memória durante a execução do programa.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js e JavaScript no back-end;
- TypeScript, interfaces, funções e parâmetros tipados;
- arrays, objetos e JSON;
- métodos de array;
- classes, atributos, métodos e modificadores de acesso;
- `fetch`, Promises e `async/await`;
- tratamento de erros com `try/catch`;
- GitHub, GitFlow e Kanban.

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX (execução de TypeScript em desenvolvimento)
- PokeAPI
- Git e GitHub
- GitHub Projects

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 18 ou superior (o `fetch` nativo exige essa versão)
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/pauloBFalmeida/Pokedex-TypeScript-Lite
```

Acesse a pasta do projeto:

```bash
cd pokedex-typescript-lite
```

Instale as dependências (`typescript`, `tsx` e `@types/node`):

```bash
npm install
```

## Como executar

Execute a demonstração no terminal:

```bash
npm run start
```

Outros scripts disponíveis:

| Comando | O que faz |
| :--- | :--- |
| `npm run start` | Executa o projeto com `tsx` |
| `npm run dev` | Executa e reinicia automaticamente ao salvar um arquivo |
| `npm run build` | Compila o TypeScript para JavaScript na pasta `dist/` |

## Funcionalidades

- Buscar Pokémon por nome ou ID
- Tratar erro de Pokémon inexistente (sem quebrar o programa)
- Transformar a resposta da API em um objeto simplificado
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicado (pelo `id`)
- Listar o catálogo
- Remover Pokémon por ID

## Exemplos de execução

### Busca válida

Entrada testada: `pikachu`

```
[OK] Pokémon encontrado: pikachu
{ id: 25, nome: 'pikachu', tipos: [ 'electric' ], altura: 4, peso: 60 }
[OK] pikachu adicionado ao catálogo.
```

### Busca válida por ID

Entrada testada: `4`

```
[OK] Pokémon encontrado: charmander
{ id: 4, nome: 'charmander', tipos: [ 'fire' ], altura: 6, peso: 85 }
[OK] charmander adicionado ao catálogo.

```

### Busca inválida

Entrada testada: `pokemon-inexistente`

```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Duplicidade

Entrada testada: adicionar `pikachu` duas vezes

```
[AVISO] pikachu já está no catálogo.
{ id: 25, nome: 'pikachu', tipos: [ 'electric' ], altura: 4, peso: 60 }
```

### Listagem

```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
#1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69
```

### Remoção

Entrada testada: remover ID `25`

```
[OK] Pokémon removido do catálogo.
```

Entrada testada: remover ID `999` (inexistente)

```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

## Estrutura do projeto

```
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts
│   ├── models/
│   │   ├── Pokemon.ts
│   │   └── CatalogoPokemon.ts
│   ├── services/
│       └── pokeApi.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

| Arquivo | Responsabilidade |
| :--- | :--- |
| `src/main.ts` | Ponto de entrada. Demonstra o fluxo completo: buscas, duplicidade, erro, listagem e remoção |
| `src/models/Pokemon.ts` | Interfaces `PokemonResumo` (objeto simplificado) e `PokemonApiResponse` (campos usados da API) |
| `src/models/CatalogoPokemon.ts` | Classe que guarda o catálogo em memória, com os métodos `adicionar`, `listar`, `remover` |
| `src/services/pokeApi.ts` | Função `buscarPokemon`: consulta a PokeAPI, trata erros e mapeia a resposta |
| `package.json` | Scripts e dependências de desenvolvimento |
| `tsconfig.json` | Configuração do compilador TypeScript em modo `strict` |

## Conceitos aplicados

### TypeScript

Todas as funções e métodos têm parâmetros e retornos tipados, como `buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null>` e `remover(id: number): void`. O projeto usa `strict: true` no `tsconfig.json`.

### Interface `PokemonResumo`

Representa o Pokémon simplificado usado dentro do sistema: `id`, `nome`, `tipos`, `altura`, `peso`, `hp`, `ataque` e `defesa`. Assim, o restante do código não depende da resposta grande e complexa da PokeAPI. A interface `PokemonApiResponse` descreve só os campos da API que o projeto utiliza.

### Fetch e async/await

A função `buscarPokemon` usa `await fetch(...)` para consultar `https://pokeapi.co/api/v2/pokemon/{nome-ou-id}` e `await resposta.json()` para ler o JSON. Ela retorna uma `Promise`, e o `main.ts` usa `await` para esperar cada busca terminar antes de seguir.

### Tratamento de erros

O `try/catch` fica dentro de `buscarPokemon`. Quando a API responde com erro (como o 404 de um Pokémon inexistente), `resposta.ok` é falso: a função exibe `[ERRO]` e retorna `null`. Se acontecer uma falha de rede ou de leitura do JSON, o `catch` exibe outra mensagem e também retorna `null`. Em nenhum caso o programa quebra.

### Métodos de array

| Método | Onde é usado |
| :--- | :--- |
| `map` | `pokeApi.ts`: transforma `types` da API em uma lista de nomes |
| `some` | `CatalogoPokemon.ts`: verifica duplicidade e se o ID existe |
| `filter` | `CatalogoPokemon.ts`: remove o Pokémon pelo ID |
| `forEach` | `CatalogoPokemon.ts`: lista o catálogo |

### Classe `CatalogoPokemon`

Possui o atributo privado `pokemons: PokemonResumo[]` (o array do catálogo) e os métodos públicos `adicionar`, `listar`, `remover`. Como o array é `private`, ele só pode ser alterado pelos métodos da classe, o que garante a regra de não permitir duplicados.

## Organização do Kanban

Link do Kanban: [https://github.com/users/pauloBFalmeida/projects/1](https://github.com/users/pauloBFalmeida/projects/1)


## Branches utilizadas

| Branch | Objetivo |
| :--- | :--- |
| `main` | Versão final e estável do projeto |
| `develop` | Integração das funcionalidades antes de ir para a `main` |
| `feat/pokedex` | Desenvolvimento do código da aplicação |
| `docs/readme` | Escrita da documentação (README) |

## Vídeo de apresentação

Link do vídeo: [https://drive.google.com/drive/folders/1wleGS_wcSt4XmoZwPt169D16Dz4bl8Jh](https://drive.google.com/drive/folders/1wleGS_wcSt4XmoZwPt169D16Dz4bl8Jh)

## Melhorias futuras

- Salvar o catálogo em um arquivo JSON para não perder os dados ao fechar o programa
- Criar um menu interativo no terminal
- Criar filtros por tipo de Pokémon