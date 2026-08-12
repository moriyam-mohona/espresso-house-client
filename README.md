# Espresso Club Client — Enterprise SaaS Frontend Foundation

A modern, production-ready, scalable SaaS frontend template built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Ant Design (AntD v5)**.

---

## 🛠️ Architecture & Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Framework providing Server-Side Rendering (SSR), Static Site Generation (SSG), and Route Handling. |
| **TypeScript** | Type-safe development with strict compiler rules and alias paths (`@/*`). |
| **Ant Design (v5)** | Enterprise UI component library with CSS-in-JS design tokens. |
| **`@ant-design/nextjs-registry`** | SSR style extraction registry preventing Flash of Unstyled Content (FOUC) in App Router. |
| **Tailwind CSS** | Utility-first styling engine, seamlessly integrated with AntD tokens. |
| **clsx & tailwind-merge** | Class name merging utility for clean, conditional component styling. |
| **ESLint** | Code quality enforcement tuned for Next.js and TypeScript standards. |

---

## 📁 Directory & Folder Structure

```
espresso-club-client/
├── public/                     # Static assets (favicons, public images)
├── src/
│   ├── app/                    # Next.js App Router route hierarchy
│   │   ├── error.tsx           # Global error boundary fallback page
│   │   ├── globals.css         # Tailwind directives and CSS design token bridge
│   │   ├── layout.tsx          # Root layout with SSR AntdRegistry & Font provider
│   │   ├── loading.tsx         # Global loading UI
│   │   ├── not-found.tsx       # Global 404 page
│   │   └── page.tsx            # Architecture status page
│   ├── components/             # Reusable UI component architecture
│   │   ├── common/             # Cross-cutting UI elements (Spinners, Empty States)
│   │   ├── providers/          # Root application context providers (AntD ConfigProvider)
│   │   └── ui/                 # Atomic design AntD wrappers (AppButton, AppCard, AppTable, etc.)
│   ├── config/                 # Application configuration
│   │   ├── env.ts              # Type-safe environment variable helper
│   │   ├── site.ts             # Global branding metadata
│   │   ├── theme.ts            # Ant Design theme design tokens
│   │   └── index.ts            # Re-export configuration
│   ├── constants/              # Fixed constants
│   │   ├── api.ts              # API endpoints and HTTP status maps
│   │   ├── routes.ts           # Type-safe route definitions
│   │   └── index.ts            # Re-export constants
│   ├── hooks/                  # Reusable custom React hooks
│   │   ├── use-is-mobile.ts    # Responsive viewport breakpoint detection hook
│   │   └── index.ts            # Re-export hooks
│   ├── lib/                    # Core libraries and utilities
│   │   ├── api-client.ts       # Typed Fetch API client with interceptors & error models
│   │   ├── logger.ts           # Environment-aware logging utility
│   │   └── index.ts            # Re-export libraries
│   ├── services/               # Data access & API domain services layer
│   │   └── README.md           # Service layer architecture documentation
│   ├── types/                  # Shared TypeScript types
│   │   ├── common.ts           # Standard API response, pagination, and entity contracts
│   │   └── index.ts            # Re-export types
│   └── utils/                  # Utility helper functions
│       ├── cn.ts               # Tailwind class merger helper (`clsx` + `tailwind-merge`)
│       ├── formatters.ts       # Currency, date, number, and text formatting functions
│       └── index.ts            # Re-export utilities
├── .env.example                # Environment variable configuration template
├── .env.local                  # Local development environment secrets (git ignored)
├── eslint.config.mjs           # ESLint code style rules
├── next.config.ts              # Next.js bundler and transpile options
├── package.json                # Project dependencies and script declarations
├── postcss.config.mjs          # PostCSS configuration for Tailwind CSS
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🔑 Key Features & Design Principles

1. **Zero Styling Conflicts**: Ant Design design tokens (`src/config/theme.ts`) are synchronized with Tailwind CSS. `@ant-design/nextjs-registry` isolates SSR style tags so styles load smoothly without layout shift or FOUC.
2. **Modular & Scalable**: Decoupled folder structure allows adding multi-role modules, dashboards, auth flows, or domain services cleanly in future steps.
3. **Type-Safe API & Env**: `ApiClient` provides standardized request/response typing and error handling. `env.ts` provides autocomplete for all environment variables.
4. **Clean Code Conventions**:
   - Files: `kebab-case` (e.g. `use-is-mobile.ts`, `app-button.tsx`)
   - Components: `PascalCase` export (e.g. `AppButton`, `PageHeader`)
   - Functions & Helpers: `camelCase` (e.g. `formatCurrency`, `cn`)
   - Path Import Alias: `@/*` pointing to `./src/*`

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application setup status.

### 3. Build & Check Code Quality

```bash
# Type check
npx tsc --noEmit

# Lint check
npm run lint

# Production build
npm run build
```
