# ShopDirect Frontend

ShopDirect Frontend is a fake internal e-commerce app built with React, Vite, and plain JavaScript only. The codebase is intentionally realistic for a small-to-mid-sized legacy frontend team: shared objects flow through multiple layers, data shapes are a little inconsistent, and there are enough cross-file assumptions to make it a strong candidate for a future JavaScript-to-TypeScript migration.

## Why this repo exists

- Demonstrate a believable JavaScript storefront before a TypeScript migration
- Provide enough legacy patterns and implicit data contracts to make migration tooling useful
- Stay runnable and readable instead of turning into a broken parody of bad code

## Tech stack

- React 18
- React Router
- Vite
- Vitest + React Testing Library

## Scripts

```bash
npm install
npm run dev
```

Additional scripts:

```bash
npm run build
npm run test
```

## Legacy JavaScript Notes

This repo intentionally keeps everything in `.js` and `.jsx` files only.

- There is no TypeScript anywhere
- There is no `tsconfig.json`
- There are no `@types/*` packages
- There is no PropTypes usage

Several parts of the app lean on implicit object shapes and loosely shared conventions. A future TypeScript migration is pending, and this codebase is designed to be a good internal demo for that workflow.
