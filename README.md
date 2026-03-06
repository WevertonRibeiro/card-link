# Card Link

Aplicacao web para troca de cartas entre usuarios.

## Resumo Executivo

O projeto implementa uma experiencia de marketplace de trocas de cartas, com:

- autenticacao (cadastro, login, sessao e logout);
- listagem de trocas publicas;
- area autenticada para montar colecao pessoal;
- criacao e exclusao de solicitacoes de troca;
- tema claro/escuro com persistencia local.

O frontend foi construido em Vue 3 + TypeScript com foco em modularidade, separacao de responsabilidades e tipagem de ponta a ponta (DTO -> mapper -> model).

## Stack Tecnica

- Vue 3 (`<script setup>`)
- TypeScript (modo `strict`)
- Vite
- Vue Router
- Pinia
- TanStack Vue Query
- Axios
- Vee-Validate + Yup
- Sass (SCSS)
- IconPark (`@icon-park/vue-next`)

## Arquitetura e Padroes

### 1. Organizacao por modulo

Cada dominio fica em `src/modules/*`:

- `auth`: autenticacao, usuario logado e validacoes de formulario
- `card`: catalogo de cartas, cartas do usuario e inclusao na colecao
- `trade`: listagem, criacao e exclusao de trocas

Cada modulo segue um padrao consistente:

- `types`: contratos DTO e modelos de dominio
- `services`: chamadas HTTP
- `mappers`: adaptacao da resposta da API para o modelo interno
- `composables`: hooks de query/mutation (Vue Query)
- `components` (quando aplicavel): componentes de interface especificos do dominio

### 2. Camada de dados

- `src/services/api.ts`: instancia unica do Axios
- `baseURL` controlada por `VITE_API_URL`
- interceptor injeta `Authorization: Bearer <token>` quando existe sessao

### 3. Estado e cache

- Pinia para estado de autenticacao (`token`, `isAuthenticated`, `clearSession`)
- Vue Query para cache e sincronizacao de dados remotos
- `QueryClient` global com:
  - `staleTime`: 1 minuto (default global)
  - `refetchOnWindowFocus`: `false`
  - `retry`: `2`

### 4. Roteamento e protecao

Arquivo: `src/routes/index.ts`

- Rotas publicas:
  - `/` (Home)
  - `/auth/login`
  - `/auth/register`
- Rota protegida:
  - `/my-account` (requer token)
- Regra de navegacao:
  - sem token + rota protegida -> redireciona para `/auth/login`
  - com token + tentativa de acesso em login/cadastro -> redireciona para `/`

### 5. Tema

- composable: `src/composables/useTheme.ts`
- alternancia claro/escuro com atributo `data-theme` no `:root`
- persistencia em `localStorage`

## Funcionalidades Implementadas

### Autenticacao

- Cadastro de usuario com validacao de:
  - nome obrigatorio
  - email valido
  - senha minima
  - confirmacao de senha
- Login com validacao de email/senha
- Armazenamento de token em `localStorage`
- Logout via menu do perfil
- Consulta de usuario atual (`/me`)

### Home

- Banner principal
- Secao "Trocas Recentes"
- Secao "Cartas em destaque"
- Listagem de trocas com:
  - usuario
  - data formatada
  - cartas oferecidas/recebidas
- Skeleton loaders para estados de carregamento

### Minha Conta (`/my-account`)

- Aba `collection`:
  - visualizacao de cartas da colecao do usuario
  - modal para adicionar cartas disponiveis
- Aba `requests`:
  - listagem de trocas criadas pelo usuario logado
  - modal para criar solicitacao de troca
  - exclusao de troca ativa

## Integracao com API

Base URL via `.env`:

```env
VITE_API_URL=https://cards-marketplace-api.onrender.com/
VITE_APP_NAME=Card Link
```

Endpoints utilizados no frontend:

- `POST /register`
- `POST /login`
- `GET /me`
- `GET /cards?rpp=5&page=1` (destaques)
- `GET /cards?rpp={rpp}&page={page}` (catalogo)
- `GET /me/cards`
- `POST /me/cards`
- `GET /trades?rpp=9&page=1`
- `POST /trades`
- `DELETE /trades/:id`

## Estrutura de Pastas

```text
src/
  components/
    layout/
    ui/
  composables/
  config/
  layouts/
    AuthLayout/
    DefaultLayout/
  modules/
    auth/
    card/
    trade/
  pages/
    protected/
    public/
  routes/
  services/
  styles/
  types/
```

## Como Executar o Projeto

### Pre-requisitos

- Node.js 20+ (recomendado)
- npm 10+ (recomendado)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variaveis de ambiente

Crie/ajuste o arquivo `.env` na raiz:

```env
VITE_API_URL=https://cards-marketplace-api.onrender.com/
VITE_APP_NAME=Card Link
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

### 4. Build de producao

```bash
npm run build
```

### 5. Preview local da build

```bash
npm run preview
```

## Scripts Disponiveis

- `npm run dev`: inicia servidor de desenvolvimento (Vite)
- `npm run build`: type-check (`vue-tsc`) + build de producao
- `npm run preview`: sobe servidor local da build gerada

## Fluxo Sugerido Para Avaliacao

1. Acesse a Home (`/`) e valide listagens publicas.
2. Crie uma conta em `/auth/register` (ou faca login em `/auth/login`).
3. Abra `Minha colecao` em `/my-account?tab=collection`.
4. Adicione cartas na colecao via modal.
5. Acesse `Solicitacoes de troca` em `/my-account?tab=requests`.
6. Crie uma troca selecionando cartas para oferecer/receber.
7. Exclua uma troca e verifique atualizacao da lista.
8. Teste o toggle de tema e o logout no menu do perfil.

## Decisoes Tecnicas Relevantes

- **Tipagem de dominio:** respostas da API nao sao consumidas diretamente na UI; sao mapeadas para models.
- **Separacao de responsabilidades:** UI, estado remoto, estado local e acesso HTTP ficam em camadas diferentes.
- **Cache inteligente:** Vue Query reduz chamadas repetidas e simplifica refresh apos mutacoes.
- **Guarda de rota simples e objetiva:** protecao por token com redirecionamentos claros.
- **Design system leve:** tokens CSS, tema e componentes reutilizaveis (`Button`, `Input`, `Tabs`, `Card`, `Menu`).

## Limitacoes Atuais (Estado do Desafio)

- Busca no header ainda nao aplica filtro real (apenas `console.log`).
- Botao "Entrar com google" esta apenas como UI (sem integracao OAuth).
- Footer ainda esta em formato placeholder.
- Nao ha suite automatizada de testes (unit/integration/e2e) no estado atual.
- Lint/format nao estao configurados via scripts no `package.json`.

## Melhorias Futuras (Propostas)

- Implementar busca real com filtros e paginacao.
- Adicionar testes unitarios (Vitest) e e2e (Playwright/Cypress).
- Configurar ESLint + Prettier + hooks de pre-commit.
- Refinar acessibilidade (aria labels, focus states, navegacao por teclado).
- Evoluir guarda de rota para estrategia baseada em expiracao de token.

## Consideracoes Finais

Este projeto foi desenvolvido para demonstrar capacidade de estruturar uma aplicacao front-end moderna com:

- boas praticas de organizacao;
- tipagem forte;
- fluxo de dados previsivel;
- experiencia de usuario coerente;
- base pronta para evolucao em escala.
