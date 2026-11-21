# Hadjer Laissaoui’s portfolio

A bilingual React and Vite portfolio for software engineering, applied AI, and intelligent systems. It uses strict TypeScript, plain CSS, and GitHub Pages.

## Development

Use Node.js 22.12 or later on the Node.js 22 line and pnpm 10.11.0 to match the GitHub Pages build.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm check:locales
pnpm build
pnpm preview
```

`pnpm build` checks the TypeScript source and translation key parity before writing the static site to `dist/`. The GitHub Pages workflow publishes that directory from `main`.

## Source and content

- `src/main.tsx` starts the app. `src/App.tsx` composes the homepage sections in `src/components/`.
- `src/data/` holds project, career, and profile metadata. Shared types live in `src/types/portfolio.ts`.
- `src/i18n/config.ts` loads the English and French JSON files from `public/locales/` over HTTP using Vite’s base URL. Update both languages when changing a string.
- `src/index.css` contains the responsive layout and both themes. `public/` contains the approved CVs, SEO, verification, and other public assets.

Use the local editorial reference at `docs/portfolio-content.md` when available. Add new projects to `src/data/projects.ts` and use the same stable project ID in both sets of translations.
