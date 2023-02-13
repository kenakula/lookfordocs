This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# GoodDoc

## Commands

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Lint project ts files
```bash
npm run lint
```

## Project structure

```
├── .husky
├── .next
├── node_modules
├── public
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── button-component
│   │   ├── container
│   │   ├── header
│   │   ├── icon
│   │   ├── pages
│   │   │   ├── main-page
│   │   │   │   └── main-popular
│   │   │   │       ├── components
│   │   │   │       │   ├── inner-component.ts
│   │   │   │       │   ├── styled-components.ts
│   │   │   │       │   └── index.ts
│   │   │   │       └── main-popular.tsx
│   │   │   ├── doctors-page
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── pages
│   │   ├── api
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── shared
│   │   ├── assets
│   │   ├── hooks
│   │   └── types
│   └── stores
│       ├── api
│       │   └── page.api.ts
│       ├── assets
│       │   └── index.ts
│       └── slices
│           └── page.slice.ts
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── custom.d.ts
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
