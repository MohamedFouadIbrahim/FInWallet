# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**finwallet** is a React Native 0.84 CLI cross-platform mobile app (iOS & Android) written in TypeScript. It is a full-featured digital wallet with 12 feature modules scaffolded and ready for implementation.

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile framework | React Native 0.84 (CLI) |
| Language | TypeScript 5.8 |
| UI / Styling | NativeWind 4 (Tailwind CSS) + Gluestack UI v2 |
| Navigation | React Navigation 7 |
| State management | Redux Toolkit |
| Backend / Auth | Standalone REST API (separate repo) |
| Payments | Stripe + Plaid (abstracted via payment service) |
| Push notifications | Firebase Messaging + Notifee |

## Commands

```bash
# Start Metro bundler (must be running for app to work)
npm start

# Run on platform
npm run ios
npm run android

# Testing
npm test                        # Run all Jest tests
npm test -- --testPathPattern=App  # Run a single test file

# Linting & type check
npm run lint
npx tsc --noEmit

# iOS native deps (run after adding/changing native dependencies)
bundle install
bundle exec pod install --project-directory=ios

# After placing font files in assets/fonts/
npx react-native-asset
```

Node version requirement: >= 22.11.0

## Code Style

Prettier config (`.prettierrc.js`):
- Single quotes
- Arrow parens: `avoid` (i.e., `x => x` not `(x) => x`)
- Trailing commas: `all`

ESLint uses `@react-native` config. Run `npm run lint` to check.

## Path Aliases

Configured in `tsconfig.json` with `baseUrl: "."`:

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@features/*` | `src/features/*` |
| `@hooks/*` | `src/hooks/*` |
| `@services/*` | `src/services/*` |
| `@store/*` | `src/store/*` |
| `@theme/*` | `src/theme/*` |
| `@utils/*` | `src/utils/*` |
| `@types/*` | `src/types/*` |
| `@assets/*` | `assets/*` |

## src/ Architecture

| Directory | Purpose |
|---|---|
| `src/app/` | App bootstrap: providers wrapper, root navigator, deep link config |
| `src/config/` | Environment vars, app constants, Axios/Firebase clients |
| `src/theme/` | Design tokens, typography, ThemeContext, swappable color presets |
| `src/components/` | Shared UI: `ui/` primitives, `layout/` wrappers, `feedback/` states, `shared/` domain components |
| `src/features/` | 12 self-contained feature modules (screens, components, hooks, services, store, types) |
| `src/navigation/` | Root navigator, main tab navigator, type-safe route params, navigation ref |
| `src/store/` | Redux Toolkit store, typed hooks, root reducer, middleware |
| `src/services/` | API client, payment providers, secure/async storage, push notifications |
| `src/hooks/` | Shared custom hooks (debounce, keyboard, network, countdown, etc.) |
| `src/utils/` | Pure utility functions (formatters, validators, currency, date, logger) |
| `src/types/` | Global TypeScript types, navigation param lists, API/model types, enums |

## Feature Modules

| # | Module | Description |
|---|---|---|
| 01 | `onboarding` | Splash, welcome carousel, get started, language select |
| 02 | `auth` | Phone/OTP, email registration, PIN, biometric login |
| 03 | `kyc` | Document capture, selfie liveness, verification tiers |
| 04 | `dashboard` | Home screen, notifications, global search |
| 05 | `wallet` | Multi-currency balances, top-up, withdraw, exchange |
| 06 | `transfer` | Send to contact/bank/wallet, international corridors |
| 07 | `receive` | QR code generation/scanning, payment requests |
| 08 | `cards` | Virtual/physical card management, freeze, PIN, limits |
| 09 | `bills` | Bill pay by category/provider, auto-pay scheduling |
| 10 | `analytics` | Spending charts, category breakdown, budgets |
| 11 | `profile` | Edit profile, security, sessions, settings, support |
| 12 | `transactions` | Full transaction history with filters |

## Asset Setup

Font `.ttf` files and image `.png` files must be placed manually:
- Fonts → `assets/fonts/` (Plus Jakarta Sans, Inter, JetBrains Mono families)
- Images → `assets/images/`

After placing fonts, run `npx react-native-asset` to link them to native projects, then rebuild.

## UI Implementation Rules

- **Always use `AppButton`** (`src/components/ui/AppButton.tsx`) for primary and secondary CTA buttons — never a raw `Pressable` with custom button styles
- **Styling approach — hybrid**:
  - NativeWind `className` for layout, spacing, color, and typography utilities
  - `StyleSheet.create` only for shadows, complex transforms, exact pixel values not covered by design tokens, and dynamic/computed inline styles
- **Before implementing any screen**:
  - check `src/components/ui/` for existing components to reuse
  - if you find any Ui created before and you want to create it create it in the components folder and use it and replace the old one
- **Use design tokens** from `tailwind.config.js` instead of hardcoded pixel values where possible:
  - Spacing: `px-xl` (24px), `pb-3xl` (40px), `gap-sm` (8px), `gap-md` (12px)
  - Heights: `h-btn` (52px), `h-header` (56px)
  - Border radius: `rounded-md` (12px), `rounded-lg` (16px)
  - Typography: `font-jakarta-bold`, `font-inter-semibold`, `font-inter-regular`, `font-inter-medium`
  - Colors: `bg-neutral-100` (#F3F4F6), `text-neutral-500` (#6B7280), `text-neutral-900` (#111827)

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react-native` | 0.84.0 | Cross-platform mobile framework |
| `react` | 19.2.3 | UI library |
| `react-native-safe-area-context` | 5.5.2 | Safe area / notch handling |
| `typescript` | 5.8.3 | Type checking |
| `nativewind` | 4.x (planned) | Tailwind CSS for React Native |
| `@gluestack-ui/themed` | 2.x (planned) | Accessible UI primitives |
| `@react-navigation/native` | 7.x (planned) | Navigation library |
| `@reduxjs/toolkit` | 2.x (planned) | State management |
| `react-native-reanimated` | 3.x (planned) | Animations |
| `react-native-gesture-handler` | 2.x (planned) | Gesture handling |
| `react-native-svg` | latest (planned) | SVG support |
