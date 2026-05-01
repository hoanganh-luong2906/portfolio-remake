# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Check linting
pnpm lint:fix     # Fix linting issues (also formats via prettier)
```

No test framework is configured.

## Architecture

**Stack:** Next.js 16.2.4 · React 19.2.4 · TypeScript · Tailwind CSS v4 · pnpm

> Next.js 16 has breaking changes from prior versions. Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`.

### Route structure

```
app/
  layout.tsx              # Root: fonts, no-FOUC theme script, global CSS
  (landing)/              # Route group — homepage
    layout.tsx            # Wraps children in <PortfolioChrome>
    page.tsx
    components/           # All landing-page sections
  blog/
    layout.tsx
    page.tsx
    [slug]/page.tsx
    components/
  experiences/
    layout.tsx
    page.tsx
    components/
```

### Single source of truth: `src/lib/data.ts`

All portfolio content (nav, projects, blog posts, experiences, testimonials, FAQs) lives in `PORTFOLIO_DATA`. No CMS, no API calls. When adding or editing content, edit only this file.

### Shared components: `src/lib/components/`

| Component               | Role                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `PortfolioChrome`       | Wraps every route — adds grain overlay, bg layer, and `RevealObserver`                  |
| `RevealObserver`        | Client component — wires IntersectionObserver to `.reveal` class → adds `.in` on scroll |
| `ThemeToggle`           | Client component — dark/light toggle, persists to `localStorage` key `hal-theme`        |
| `project-art/index.tsx` | SVG illustrations for each project, switched by `ArtKind`                               |

### State colocation (Kent C. Dodds convention)

State lives as close to where it's used as possible. This is the guiding rule for all component design:

- **Server Components by default.** Only add `"use client"` when the component needs hooks or browser APIs.
- **Lift state only when two siblings genuinely share it.** If only one component needs a piece of state, it owns it.
- **No prop-drilling through server trees.** If a client component deep in the tree needs state, co-locate the state there — don't hoist it to a server parent just to pass it down.
- **`HomeClient` and `Nav` each track active section independently** via their own `IntersectionObserver` — this is intentional, not a bug. Extracting shared state here would force both into a common client boundary for no real gain.

Practical checklist when adding a component:

1. Can it be a Server Component? If yes, make it one.
2. Does its state need to be visible outside it? If no, keep it local.
3. If two components share state, find their lowest common ancestor and put it there.

### Theming

CSS custom properties in `app/globals.css` define the design tokens (`--bg`, `--fg`, `--accent`, etc.). Dark is the default; light theme activates on `html[data-theme="light"]` or `body[data-theme="light"]`. The no-FOUC inline script in `app/layout.tsx` reads `localStorage` and sets `data-theme` before first paint.

### Animation pattern

Add `className="reveal"` to any element to opt into scroll-reveal. `RevealObserver` (mounted once per route via `PortfolioChrome`) adds `className="in"` when the element enters the viewport. The CSS for `.reveal` and `.reveal.in` lives in `app/globals.css`.

### CSS approach

Tailwind v4 utility classes + hand-written CSS variables. Design tokens are CSS variables, not Tailwind config. Do not duplicate token values — always reference `var(--token-name)`.

### Linting / formatting

`eslint.config.mjs` uses `@antfu/eslint-config` with prettier integration. Single quotes, 2-space indent, semicolons on. Run `pnpm lint:fix` before committing.
