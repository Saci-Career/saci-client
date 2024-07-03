# Saci Client

Saci is an application that allows users to evaluate themselves in some knowledges, according to a choosen role. Let's suppose we have a company called ACME. ACME has as roles: clerks, programmers and managers. Each one of these roles has its own levels. So a manager can be an entry level manager, a mid level manager, or an advanced manager for example. How does an ACME manager know his/her level? How does a manager know what he/she needs to do, to get to the next level?

Saci creates a mechanism, where ACME career managers can create roles, knowledges and role levels, allowing ACME workers to assess themselves. With this assessment, they can know in what level they are (for their roles) and what they need to do to achieve the next level.

This repository is the frontend project, containing the worker assessment screens. To check how the assessment works under the hood, check the [Saci Admin documentation](https://github.com/Saci-Career/saci-admin)

This project is a result of a partnership between Escola Profissional Bento de Jesus Caraça and Kuehne+Nagel. It was developed by intern students (check the contributors)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
