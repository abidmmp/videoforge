# VideoForge AI — Frontend Architecture Report

> Generated audit of the current frontend codebase. **No code was modified.**
> This document describes the application *as it exists today* and how it is
> designed to plug into the existing **MoneyPrinterTurbo** Python backend.

---

## 1. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | React **19.2** | Functional components, hooks-only |
| **Meta-framework** | **TanStack Start v1** (Vite plugin) | SSR-capable, file-based routing under `src/routes/` |
| **Routing** | `@tanstack/react-router` v1.170 | Auto-generated `routeTree.gen.ts`, typed links |
| **Build Tool** | **Vite 8** + `@tailwindcss/vite` | `vite-tsconfig-paths` for `@/*` aliases |
| **Language** | **TypeScript 5.8** (strict) | Single shared type module in `src/types/index.ts` |
| **State Management** | **React Context + `useReducer`** | Single store `AppStateProvider` (`src/store/app-state.tsx`) |
| **Server Data** | `@tanstack/react-query` v5 | Installed but currently unused — reserved for Phase 8 backend wiring |
| **Forms** | `react-hook-form` + `@hookform/resolvers` + `zod` | Available, unused in current UI |
| **UI Primitives** | **Radix UI** (28 packages) | Wrapped in shadcn-style components under `src/components/ui/` |
| **Component Library** | shadcn-style (local) | 50 prebuilt primitives (button, dialog, sheet, drawer, dropdown, etc.) |
| **CSS Framework** | **Tailwind CSS v4** | Configured through `src/styles.css` via `@import`, `@theme`, `@utility` |
| **Theme Tokens** | OKLCH CSS variables | Brand green gradient `#164E32 → #227850` |
| **Icons** | **lucide-react** v0.575 | Only icon library; ~120 distinct icons used |
| **Charts** | `recharts` v2.15 | Installed; not yet rendered in any page |
| **Animation** | `tw-animate-css` + Tailwind utilities | No Framer Motion; uses `animate-in`, `animate-pulse`, `animate-spin` |
| **Toasts** | **sonner** v2 | Global `<Toaster />` in `__root.tsx` |
| **Command Palette** | **cmdk** v1 (+ custom palette) | Global ⌘/Ctrl + K |
| **Carousel** | `embla-carousel-react` | Available |
| **Drawer / Sheet** | `vaul` | Available |
| **Date utils** | `date-fns` v4 | Used by `relativeTime()` helper |
| **Fonts** | **Plus Jakarta Sans** (display) + **Inter** (body) | Loaded via `<link>` in `__root.tsx` |
| **Lint / Format** | ESLint 9 + Prettier 3 | Standard configs |

---

## 2. Project Structure

```
.
├── package.json
├── vite.config.ts
├── tsconfig.json
├── components.json                # shadcn registry
├── src/
│   ├── start.ts                   # TanStack Start client entry
│   ├── server.ts                  # SSR entry
│   ├── router.tsx                 # Router config + QueryClient hook
│   ├── routeTree.gen.ts           # AUTO-GENERATED — do not edit
│   ├── styles.css                 # Tailwind v4 entry + design tokens
│   │
│   ├── routes/                    # File-based routes (34 files)
│   │   ├── __root.tsx             # Root layout, head, Toaster, AppStateProvider
│   │   ├── index.tsx              # Dashboard
│   │   ├── create.tsx             # Script Studio
│   │   ├── video-settings.tsx     # Video assembly + encoder
│   │   ├── audio-studio.tsx       # TTS + BGM
│   │   ├── subtitle-studio.tsx    # Captions, templates, animations
│   │   ├── render.tsx             # Render Studio (live pipeline)
│   │   ├── queue.tsx              # Render queue manager
│   │   ├── outputs.tsx            # Output gallery + player
│   │   ├── projects.tsx           # Project manager
│   │   ├── basic-settings.tsx     # AI / video-source provider config
│   │   ├── api-manager.tsx        # API key & quota manager
│   │   ├── settings.tsx           # General app settings (tabs)
│   │   ├── developer.tsx          # Raw JSON + log inspector
│   │   ├── logs.tsx               # Log viewer
│   │   ├── languages.tsx          # Language pack manager
│   │   ├── notifications.tsx      # Notification center
│   │   ├── voices.tsx / music.tsx / templates.tsx / effects.tsx
│   │   │                          # Library views (redirect to Studios)
│   │   ├── assets.tsx             # Media asset library
│   │   ├── about.tsx              # About / version
│   │   ├── account.tsx            # Account overview
│   │   ├── profile.tsx / billing.tsx / subscription.tsx /
│   │   │   usage.tsx / security.tsx / help.tsx
│   │   │                          # Coming-soon stubs
│   │   └── login.tsx / signup.tsx / forgot-password.tsx /
│   │       reset-password.tsx     # Auth stubs (UI only)
│   │
│   ├── components/
│   │   ├── app-shell.tsx          # Sidebar, top bar, footer, primitives
│   │   ├── auth-shell.tsx         # Layout for auth pages
│   │   ├── command-palette.tsx    # ⌘K palette + useCommandPalette hook
│   │   ├── subtitle-templates.tsx # 100+ subtitle template catalog
│   │   ├── shared/index.tsx       # StatusBadge, EmptyState, LoadingPanel,
│   │   │                          # SaveIndicator, HelpTip, Skeleton,
│   │   │                          # StudioRedirectBanner, ComingSoonPage
│   │   ├── render/
│   │   │   ├── pipeline.tsx       # Live 15-stage pipeline visualizer
│   │   │   └── video-player.tsx   # Pro video player (scrub, speed, PiP)
│   │   └── ui/                    # 50 shadcn primitives
│   │
│   ├── store/
│   │   └── app-state.tsx          # Global Context + useReducer store
│   │
│   ├── lib/
│   │   ├── constants.ts           # Layout, limits, providers, encoders
│   │   ├── render-pipeline.ts     # PIPELINE_STAGES, seed data, helpers
│   │   ├── utils.ts               # `cn()` className merge
│   │   ├── error-capture.ts       # Global error capture
│   │   ├── error-page.ts          # Error page utilities
│   │   └── lovable-error-reporting.ts
│   │
│   ├── types/
│   │   └── index.ts               # Single source of truth — all domain types
│   │
│   └── hooks/
│       └── use-mobile.tsx
└── FRONTEND_ARCHITECTURE.md       # ← this file
```

**Folder roles**

| Folder | Purpose |
|---|---|
| `src/routes/` | One file per URL. TanStack plugin generates the route tree at build. |
| `src/components/` | Presentational + structural components shared across routes. |
| `src/components/ui/` | Low-level shadcn primitives (do not edit visual identity here). |
| `src/components/render/` | Render-specific composites (pipeline, video player). |
| `src/components/shared/` | App-wide reusable primitives (badges, empty states, skeletons). |
| `src/store/` | Global Context store, reducer, helper hooks. |
| `src/lib/` | Pure helpers, constants, design tokens, pipeline definitions. |
| `src/types/` | All shared TypeScript domain models. |
| `src/hooks/` | Reusable React hooks. |
| `src/styles.css` | Tailwind v4 entry, theme variables, custom utilities. |

---

## 3. Routing

All routes are file-based under `src/routes/`. Every route exports
`Route = createFileRoute("...")` and a `<RouteComponent />`.

| URL | File | Purpose | Components | Completion | Backend mapping |
|---|---|---|---|---|---|
| `/` | `index.tsx` | **Dashboard** — KPIs, render pipeline preview, recent outputs/projects | `StatCardHero`, `RenderPipeline`, `TimerCard`, `QuickActions` | 100% | `GET /stats`, `GET /renders/recent`, WS `task/events` |
| `/create` | `create.tsx` | **Script Studio** — subject, advanced settings, script editor, keywords, AI rail | Subject card, generation pipeline, analytics tiles, keywords manager, live preview | 100% | `POST llm.generate_script`, `POST llm.generate_terms` |
| `/video-settings` | `video-settings.tsx` | Video source, assembly mode, transitions, aspect ratio, encoder | Provider grid, transition gallery, encoder selector, render-plan summary | 100% | `material.search_videos`, `video.combine_videos` config |
| `/audio-studio` | `audio-studio.tsx` | TTS provider/voice library, controls, BGM modes | Provider grid, voice list, controls, BGM cards | 100% | `voice.tts`, `voice.list_voices` |
| `/subtitle-studio` | `subtitle-studio.tsx` | Captions style, 100+ templates, animations, karaoke, brand kit | Tabs (Style / Templates / Animations / Karaoke / Themes / Brand) + 9:16 live preview | 100% | `subtitle.create`, `subtitle.style` |
| `/render` | `render.tsx` | **Render Studio** — start render, live pipeline, summary | `RenderPipeline`, summary rails, success banner | 100% | WS `task.events`, `POST /render/start` |
| `/queue` | `queue.tsx` | Render Queue — status filters, pause/resume/retry | Filter tabs, queue rows | 100% | `GET /renders`, `POST /render/{id}/{action}` |
| `/outputs` | `outputs.tsx` | Output gallery with metadata, favorites, video player drawer | Output cards, metadata drawer, `VideoPlayer` | 95% | `GET /outputs`, file download stream |
| `/projects` | `projects.tsx` | Project manager with grid/list toggle | Project cards, view-mode toggle | 80% | `GET/POST/DELETE /projects` |
| `/basic-settings` | `basic-settings.tsx` | AI LLM provider + video source API config | Provider grid, model browser, health panel | 100% | `config.toml` read/write |
| `/api-manager` | `api-manager.tsx` | Key management, quota, masking | Provider cards | 90% | `config.toml`, validation pings |
| `/settings` | `settings.tsx` | General app (Rendering, GPU, Storage, Performance, Notifications) | Tabbed settings | 95% | Local config + `config.toml` |
| `/developer` | `developer.tsx` | Raw JSON + event inspector | JSON viewers | 90% | WS event firehose |
| `/logs` | `logs.tsx` | Application log viewer | Filters, log list | 85% | `GET /logs` SSE |
| `/languages` | `languages.tsx` | Language packs | Language grid | 80% | `i18n.list_languages` |
| `/notifications` | `notifications.tsx` | Notification center, filters, mark-all-read | Tabs, list, stat tiles | 100% | Driven by global store events |
| `/voices` | `voices.tsx` | Voice library mirror (redirect banner to Studio) | Banner + grid | 70% | Same as `/audio-studio` |
| `/music` | `music.tsx` | Music library (redirect banner) | Banner + grid | 70% | `material.list_music` |
| `/templates` | `templates.tsx` | Template gallery (redirect banner) | Banner + grid | 70% | Local catalog |
| `/effects` | `effects.tsx` | Video effects gallery (redirect banner) | Banner + grid | 70% | Local catalog |
| `/assets` | `assets.tsx` | Local media asset library | Tabs, grid | 60% | `GET /assets`, upload |
| `/account` | `account.tsx` | Account overview | Profile card, plan, security | 80% | Auth backend |
| `/about` | `about.tsx` | Version, credits, system info | Cards | 100% | Static |
| `/profile` `/billing` `/subscription` `/usage` `/security` `/help` | * | **Coming-soon** stubs via `ComingSoonPage` | Shared component | 30% (stub) | Future |
| `/login` `/signup` `/forgot-password` `/reset-password` | * | Auth UI stubs | `AuthShell` | 60% UI / 0% logic | Future auth provider |

---

## 4. Sidebar (`src/components/app-shell.tsx`)

Two sections: **STUDIO** and **SYSTEM**.

### STUDIO

| Item | Target | Badge | Current functionality | Missing |
|---|---|---|---|---|
| Dashboard | `/` | — | Active highlight, navigates | Live KPI refresh |
| Create Video | `/create` | `AI` | Navigates | Project-bound state |
| Video Settings | `/video-settings` | `NEW` | Navigates | Persistence |
| Audio Studio | `/audio-studio` | `NEW` | Navigates | Voice preview audio API |
| Projects | `/projects` | `24` (static) | Navigates | Real count from backend |
| Subtitle Studio | `/subtitle-studio` | — | Navigates | — |
| Video Effects | `/effects` | — | Navigates | — |
| Assets Library | `/assets` | — | Navigates | Upload/download wiring |
| Templates | `/templates` | — | Navigates | — |
| Voices | `/voices` | — | Navigates | TTS preview |
| Music | `/music` | — | Navigates | Stream preview |
| Render Studio | `/render` | `PRO` | Navigates | Live WS events |
| Render Queue | `/queue` | — | Navigates | Live queue state |
| Outputs | `/outputs` | `3` (static) | Navigates | Real count |

### SYSTEM

| Item | Target | Badge | Functionality | Missing |
|---|---|---|---|---|
| API Manager | `/api-manager` | — | Mask/edit keys (local) | Persist to backend |
| Basic Settings | `/basic-settings` | `NEW` | Provider config (local) | Persist to `config.toml` |
| Languages | `/languages` | — | Local list | Download packs |
| Logs | `/logs` | — | Local placeholder | SSE log stream |
| Settings | `/settings` | — | Tabs (local) | Persistence |
| Developer Mode | `/developer` | — | JSON inspectors | Live event source |
| About | `/about` | — | Static | Auto version pull |

---

## 5. Top Navigation (`AppShell → TopBar`)

| Element | Behaviour |
|---|---|
| **Breadcrumb / page title slot** | Rendered by each `PageHeader` |
| **Search input** | Click or focus opens the **CommandPalette**; shows `⌘K` hint |
| **Quick Actions menu** | Dropdown (Wand2 icon) — links to common entry points |
| **Language selector** | 8 languages, dropdown selection (UI only) |
| **Theme switch** | Toggles `dark` class on `<html>` (Sun/Moon icon) |
| **System status** | Pulsating dot with tooltip "Live"; aria-label set |
| **Notifications bell** | Opens slide-over `NotificationCenter` panel (All / Unread filters); pulls from store |
| **User menu** | Avatar dropdown — Account, Profile, Billing, Subscription, Usage, Security, Help, Sign out — `PRO` badge |

Global keyboard shortcut: **⌘K / Ctrl+K** opens the Command Palette
(registered by `useCommandPalette()` in `AppShell`).

---

## 6. Page Documentation (highlights)

> Every page renders inside `<AppShell>` with a `<PageHeader>` (crumbs,
> title, subtitle, actions). All pages share design tokens defined in
> `src/styles.css`.

### `/` Dashboard
- **Sections:** Hero stats, live render pipeline preview, render timer, recent outputs grid, recent projects, quick actions.
- **Controls:** Filter chips, "New Project" CTA, pipeline stage chips.
- **Sticky panels:** None (single column).
- **Backend mapping:** Aggregates `GET /stats`, `GET /renders/recent`, `GET /projects/recent`, WS `task/events` for the pipeline preview.

### `/create` Script Studio
- **Sections:** Subject card, Generate Script CTA + animated 5-step pipeline, Advanced Settings (paragraphs slider, tone presets, custom system prompt), Script Editor with **8** analytics tiles (word count, est duration, reading level, sentiment, etc.) and **10** AI action buttons (Rewrite, Shorten, Expand, Translate, Hook, CTA, Tone-shift, Fact-check, SEO boost, Emojify), Keywords manager (drag-sort, pinned, Pexels preview), Sticky AI Assistant rail and 9:16 Live Preview.
- **Backend mapping:** `llm.generate_script`, `llm.generate_terms`, `material.search_videos` (preview thumbnails).

### `/video-settings`
- **Sections:** Source provider grid (Pexels, Pixabay, Coverr, Local), Assembly mode (Sequential / Random), Transitions gallery, Aspect ratio selector, Clip duration sliders, Encoder selector (NVENC/CPU badges), Smart Video Matching workflow, Render Plan summary sidebar.
- **Backend:** writes to `task.params`, drives `material.match` and `video.combine_videos`.

### `/audio-studio`
- **Sections:** 9 TTS providers, voice library with filters (language/gender/favorite), voice preview player with waveform, controls (volume/speed/pitch), custom audio upload (drag-drop), BGM section (none/preset/custom, loop/fade/trim).
- **Backend:** `voice.tts`, `voice.list_voices`, BGM file pipeline.

### `/subtitle-studio`
- **Tabs:** Style, Templates, Animations, Karaoke, Themes, Brand.
- **Sections:** Font browser (35 fonts), position grid (9 zones), text style controls, stroke/background pill controls, **100+** templates (via `subtitle-templates.tsx`), animation studio (In/Out/Loop, duration, curve), karaoke sync modes, brand kit presets.
- **Sticky:** 9:16 live preview + AI style recommendation.
- **Backend:** `subtitle.create`, `subtitle.style`.

### `/render` Render Studio
- **Sections:** Project summary, content summary, output summary, **15-stage live pipeline** (`RenderPipeline`), Render Complete success banner with quick-actions, Cancel/Pause/Retry buttons.
- **Backend:** WS `task.events` drives a `StatesMap`. `POST /render/start` enqueues; cancel/pause/resume call into `task.control`.

### `/queue`
- **Sections:** Filter tabs (All/Queued/Running/Completed/Failed), task rows with progress bars, per-row actions (pause, resume, retry, duplicate, cancel).
- **Backend:** `GET /renders`, `POST /render/{id}/{action}`.

### `/outputs`
- **Sections:** Rich output cards (thumbnail, resolution, FPS, size, codec), favorite toggle, detailed metadata drawer, professional **VideoPlayer** (scrub, speed 0.25–2x, volume, loop, subtitle toggle, PiP, safe-area overlays).
- **Backend:** `GET /outputs`, file streaming, metadata.

### `/basic-settings`
- **Sections:** AI provider grid (16 LLM providers), masked key inputs, validation badges, model browser with search/pinning, Video source API cards (Pexels, Pixabay) with status toggles, Connection health panel (latency/quota/test connection), Quick Actions (Import/Export/Backup/Restore/Reset All).
- **Backend:** read/write `config.toml`; validation pings to provider endpoints.

### `/api-manager`
- **Sections:** Provider key cards with mask/reveal, quota bars, last-used timestamp.
- **Backend:** key persistence + validation pings.

### `/settings`
- **Tabs:** General, Rendering, Performance, GPU, Storage, Notifications.
- **Backend:** local prefs + `config.toml`.

### `/developer`
- **Sections:** Raw event firehose, JSON inspector, task payload viewer.
- **Backend:** WS subscribe-all.

### `/logs`
- **Sections:** Level filter, search, scrollable log feed.
- **Backend:** SSE log stream.

### `/notifications`
- **Sections:** 4 stat tiles (Unread / Today / Render events / Errors), category tabs (All / Render / API / System / Billing / Updates), unread filter, per-row deep-link "View" CTA, Mark-all-read, Clear-all.
- **Backend:** driven by `state.notifications`; events pushed by `PUSH_NOTIFICATION` in response to WS events.

### Coming-soon stubs
`profile`, `billing`, `subscription`, `usage`, `security`, `help` — all
render `ComingSoonPage` from `shared/index.tsx`.

### Auth stubs
`login`, `signup`, `forgot-password`, `reset-password` use `AuthShell`
(no business logic).

---

## 7. Component Inventory

### App shell (`src/components/app-shell.tsx`)
| Component | Purpose | Key props | Used in |
|---|---|---|---|
| `AppShell` | Layout (sidebar, top bar, content, footer) | `children`, `maxWidth?=1760` | Every page |
| `PageHeader` | Crumbs, title, subtitle, actions slot | `crumb[]`, `title`, `subtitle?`, `actions?` | Every page |
| `PrimaryButton` / `GhostButton` | Primary action buttons | standard button props | App-wide |
| `Pill` | Status pill | `tone` ∈ `default \| primary \| success \| warning \| danger` | Pipeline, lists |
| `Sidebar`, `TopBar`, `NavItem`, `NotificationCenter` (internal) | — | — | App shell |

### Shared primitives (`src/components/shared/index.tsx`)
| Component | Purpose | Props |
|---|---|---|
| `StatusBadge` | Coloured uppercase tag | `tone`, `icon?`, `children` |
| `EmptyState` | Empty/zero-data card | `icon?`, `title`, `description?`, `action?` |
| `LoadingPanel` | Spinner card | `label?` |
| `SaveIndicator` | Dirty/saving/saved chip | `isDirty`, `isSaving`, `lastSavedAt?` |
| `HelpTip` | Tooltip with optional "Learn more" | `label`, `learnMoreHref?` |
| `Skeleton` | Pulsing block | `className?` |
| `StudioRedirectBanner` | Brand-gradient redirect CTA | `title`, `description`, `to`, `ctaLabel` |
| `ComingSoonPage` | Full-page stub | `crumb[]`, `title`, `subtitle?`, `eta?`, `description?`, `icon?` |

### Render module (`src/components/render/`)
| Component | Purpose | Props |
|---|---|---|
| `RenderPipeline` | 15-stage live visualizer | `states: StatesMap`, `compact?` |
| `VideoPlayer` | Pro player (scrub, speed, PiP, subs) | `src`, `subtitles?`, `aspectRatio?`, `safeAreas?` |

### Other
| Component | Purpose |
|---|---|
| `CommandPalette` (+ `useCommandPalette`) | Global ⌘K palette across nav, libraries, system, account, providers |
| `AuthShell` | Layout for auth pages |
| `subtitle-templates.tsx` | 100+ template catalog + selector grid |
| `ui/*` (50 files) | Radix-based shadcn primitives |

---

## 8. Current User Workflow

```
Dashboard
   │
   ▼
Create Video (Script Studio)
   ├── Generate Script  ──► llm.generate_script
   └── Generate Keywords ─► llm.generate_terms
   │
   ▼
Video Settings   (source, assembly, transitions, encoder)
   │
   ▼
Audio Studio    (TTS voice, controls, BGM)
   │
   ▼
Subtitle Studio (style, template, animation, karaoke, brand)
   │
   ▼
Render Studio   ──► RenderTask enqueued
   │
   ▼
Render Queue    (pause / resume / retry / cancel)
   │
   ▼
Outputs         (preview, download, favorite, metadata)
   │
   ▼
Notifications + History
```

Cross-cutting flows: **⌘K** command palette from anywhere · **Notifications**
bell or `/notifications` for full history · **Projects** for resuming drafts.

---

## 9. State Management

### Global store (`src/store/app-state.tsx`)

Single Context + `useReducer` store. Initialised from
`seedNotifications()`, `seedRenderQueue()`, and `seedOutputs()` in
`render-pipeline.ts`.

**Slices**

- `currentProject: Project | null`
- `currentScript: Script | null`
- `currentKeywords: Keyword[]`
- `selectedVoice: Voice | null`
- `videoSettings: VideoSettings`
- `audioSettings: AudioSettings`
- `subtitleSettings: SubtitleSettings`
- `selectedSubtitleTemplate / Animation`
- `selectedTransition: TransitionId`
- `preferences: UserPreferences` (theme, language, notifications)
- `notifications: Notification[]` (capped at 100)
- `renderQueue: RenderTask[]`
- `isDirty / isSaving / lastSavedAt`

**Action types** (reducer)

```
SET_PROJECT | SET_SCRIPT | SET_KEYWORDS | SET_VOICE | SET_TEMPLATE
SET_ANIMATION | SET_TRANSITION | PATCH_VIDEO | PATCH_AUDIO
PATCH_SUBTITLE | SET_THEME | PATCH_PREFS | PUSH_NOTIFICATION
MARK_NOTIFICATIONS_READ | ENQUEUE_RENDER | UPDATE_RENDER
MARK_DIRTY | MARK_SAVING | MARK_SAVED
```

**Ergonomic helpers** exposed by `useAppState()`:
`setProject`, `setScript`, `setKeywords`, `setVoice`, `setTemplate`,
`setTransition`, `patchVideo/Audio/Subtitle`, `setTheme`,
`pushNotification`, `markNotificationsRead`, `markSaved`.

Optional selector: `useAppSlice(selector)`.

### Shared types (`src/types/index.ts`)

Single module of all domain models — mirrors the MoneyPrinterTurbo Python
contract. Includes `Project`, `Script`, `Keyword`, `Voice`, `AudioSettings`,
`VideoSettings`, `SubtitleSettings`, `SubtitleTemplate`,
`SubtitleAnimation`, `RenderTask`, `RenderStatus`, `Output`, `Notification`,
`NotificationCategory`, `UserPreferences`, `APIKey`, `LLMProviderConfig`,
`ThemeMode`, and enums (`AspectRatio`, `Tone`, `Encoder`, `TransitionId`, …).

### Shared constants (`src/lib/constants.ts`)

Layout offsets (`TOPBAR_HEIGHT_PX`, `MAX_CONTENT_WIDTH_PX=1760`,
`SIDEBAR_WIDTH_PX=260`), animation durations, radii, shadows, domain
limits (`SCRIPT_MAX_PARAGRAPHS=10`, `CLIP_MIN/MAX_SEC`, `KEYWORDS_MAX=24`),
`ASPECT_RATIOS`, `ENCODERS`, `TRANSITIONS`, and **16 LLM_PROVIDERS**.

### Pipeline (`src/lib/render-pipeline.ts`)

`PIPELINE_STAGES` — 15 immutable stages, each with `id`, `label`, `hint`,
`icon`, and `backend` (Python task identifier). Helpers: `statusTone()`,
`relativeTime()`, `seedRenderQueue()`, `seedOutputs()`,
`seedNotifications()`.

### Events / Toasts

- **Toasts:** `sonner` global `<Toaster />` in `__root.tsx`. Pages call
  `toast.success(…)`, `toast.error(…)`.
- **Notifications:** in-app store. `pushNotification()` adds, capped at 100.
- **Keyboard:** `useCommandPalette()` registers global ⌘/Ctrl + K.

---

## 10. Design System

### Colors (OKLCH variables in `src/styles.css`)
| Token | Light value | Role |
|---|---|---|
| `--background` | `oklch(0.972 0 0)` | App background `#F7F7F7` |
| `--foreground` | `oklch(0.18 0.02 160)` | Primary text |
| `--card` | `oklch(1 0 0)` | Card surface (white) |
| `--primary` | `oklch(0.42 0.11 155)` | Brand green |
| `--primary-dark` | `oklch(0.32 0.09 155)` | Brand deep |
| `--accent` | `oklch(0.95 0.02 155)` | Subtle accent surface |
| `--secondary` / `--muted` | `oklch(0.96 0.005 160)` | Neutral surfaces |
| `--success` | `oklch(0.62 0.16 155)` | Success |
| `--warning` | `oklch(0.78 0.15 75)` | Warning amber |
| `--destructive` | `oklch(0.6 0.22 27)` | Error |
| `--border` / `--input` / `--ring` | OKLCH neutrals | Lines / focus |

**Brand gradient utility:** `bg-brand-gradient` = `linear-gradient(180deg, #164E32 → #227850)`. Also `bg-brand-gradient-radial` and `text-brand-gradient`.

### Typography
- **Display:** Plus Jakarta Sans (`font-display`) — h1–h5, hero numbers, titles.
- **Body:** Inter (`font-sans`).
- Heading letter-spacing tightened to `-0.02em`.
- Common sizes: `10–11.5px` (meta/labels), `12–13.5px` (body), `15–16px` (card titles), `20–28px` (page titles & stats).

### Spacing
- `MAX_CONTENT_WIDTH_PX = 1760`, sidebar `260px`, topbar `64px`.
- Pages use `px-8 pb-10 pt-2`. Cards: `p-5 / p-6 / p-10`.

### Radius
- `--radius: 0.875rem` (14px) base. Tailwind aliases `rounded-2xl` (panels), `rounded-3xl` (cards), `rounded-xl` (pills, buttons).

### Shadows (custom utilities)
- `shadow-card` — `0 1px 2px / 0 1px 3px` neutral
- `shadow-card-lg` — `0 4px 24px -8px` for dialogs
- `shadow-brand` — green-tinted CTA glow

### Icons
- `lucide-react` only. Sizes `w-3 → w-6`, stroke `2 → 2.5` for brand glyphs.

### Buttons
- `PrimaryButton` — brand gradient + `shadow-brand`.
- `GhostButton` — neutral, hover `bg-secondary`.
- Standard icon buttons height `h-8 / h-9 / h-10`.

### Cards
- `rounded-3xl bg-card border border-border shadow-card`.
- Section headers padded `px-6 py-5` with `border-b border-border`.

### Inputs
- shadcn `Input`, `Select`, `Slider`, `Switch`, `Checkbox` — themed via CSS variables.

### Tables / Lists
- Rendered as stacked rows inside `rounded-3xl` cards (e.g. notifications, queue).

### Dialogs
- shadcn `Dialog`, `Sheet`, `Drawer`. Command palette uses bespoke fixed overlay (`bg-black/40 backdrop-blur-sm`).

### Toasts
- `sonner` global. Triggered on toggles, save, copy, etc.

### Animations
- `tw-animate-css` + Tailwind `animate-in fade-in zoom-in-95 duration-150` for overlays.
- Live indicators: `animate-pulse`, `animate-spin`.
- Pipeline running state: gradient fill width transition.

### Loading
- `LoadingPanel`, `Skeleton`, `Loader2` spinners.

### Empty states
- `EmptyState` (dashed border card, icon, title, description, action).

### Skeletons
- `Skeleton` primitive (`animate-pulse rounded-lg bg-secondary/70`).

---

## 11. Backend Readiness (mapping to MoneyPrinterTurbo)

| UI surface | Backend touchpoint | Transport |
|---|---|---|
| `/basic-settings`, `/api-manager` | `app/config/config.toml` read/write; provider validation | REST `GET/PUT /config` |
| `/create` Generate Script | `app.services.llm.generate_script` | REST `POST /llm/script` |
| `/create` Generate Keywords | `app.services.llm.generate_terms` | REST `POST /llm/terms` |
| `/video-settings` (Pexels/Pixabay) | `app.services.material.search_videos` | REST `POST /materials/search` |
| `/audio-studio` voice preview | `app.services.voice.tts` | REST `POST /tts/preview` (returns audio blob) |
| `/audio-studio` voice list | `app.services.voice.list_voices` | REST `GET /tts/voices` |
| `/subtitle-studio` | `app.services.subtitle.create` (Whisper) | REST `POST /subtitle/create` |
| `/render` start | `app.services.task.start` enqueues task | REST `POST /tasks` |
| `/render` live progress | `task.py` stage events | **WebSocket / SSE** `ws://…/tasks/{id}/events` emitting `{ stageId, status, progress, message, currentScene, currentClip, currentFile }` — maps directly into `RenderPipeline.states` |
| `/queue` actions | `task.control.{pause,resume,retry,cancel}` | REST `POST /tasks/{id}/{action}` |
| `/outputs` | `app.services.task.outputs` + static file server | REST `GET /outputs`, `GET /files/{path}` |
| `/notifications` | Server-pushed events | WS subscribe to all `task.events` and translate to `Notification` shape |
| `/logs`, `/developer` | Python logging firehose | **SSE** `GET /logs/stream` |
| Account / Auth | Not yet defined | TBD (Phase 8) |

**Single source of truth:** every render-related view consumes the same
`RenderTask` model from the global store, so wiring requires only a
`PUSH_NOTIFICATION` / `UPDATE_RENDER` dispatch on each WS message.

---

## 12. Current Completion

| Dimension | Estimate | Notes |
|---|---|---|
| Overall UI completion | **~92 %** | All flows reachable & designed; minor polish + persistence remains |
| Architecture completion | **~95 %** | Types, store, pipeline, design tokens, command palette in place |
| Component completion | **~90 %** | 4 mirror libraries (voices/music/templates/effects) still thin |
| Remaining UI work | ~8 % | Helper-text adoption, micro-polish, real charts (recharts), assets uploader |
| Remaining backend work | **100 %** | No live calls anywhere; everything is local state + seed data |
| Remaining AI features | ~70 % | AI buttons in Script Studio + Subtitle Studio need provider wiring |
| Desktop readiness | **High** | 1760 px max width, sticky sidebar, ⌘K, dense info layout, keyboard nav |
| SaaS readiness | **Medium** | Auth/billing/usage/subscription are stubs; account UI exists, no provider |

### Per-page summary

| Page | Completion | Backend Ready | Needs Work | Priority |
|---|---|---|---|---|
| Dashboard `/` | 100 % | No | Live KPIs/feed | High |
| Create Video `/create` | 100 % | No | Wire `llm.*` | **Critical** |
| Video Settings `/video-settings` | 100 % | No | Wire provider search | High |
| Audio Studio `/audio-studio` | 100 % | No | TTS preview blob | High |
| Subtitle Studio `/subtitle-studio` | 100 % | No | Wire `subtitle.create` | High |
| Render Studio `/render` | 100 % | No | WS `task.events` | **Critical** |
| Render Queue `/queue` | 100 % | No | List + control endpoints | High |
| Outputs `/outputs` | 95 % | No | Real list + download stream | High |
| Projects `/projects` | 80 % | No | CRUD endpoints | Medium |
| Basic Settings `/basic-settings` | 100 % | No | `config.toml` r/w | **Critical** |
| API Manager `/api-manager` | 90 % | No | Key persistence + ping | High |
| Settings `/settings` | 95 % | No | Persistence | Medium |
| Notifications `/notifications` | 100 % | Partial (store) | WS hook-up | High |
| Logs `/logs` | 85 % | No | SSE feed | Medium |
| Developer `/developer` | 90 % | No | Event firehose | Medium |
| Languages `/languages` | 80 % | No | i18n list | Low |
| Assets `/assets` | 60 % | No | Upload / list endpoints | Medium |
| Voices `/voices` | 70 % | No | Mirror Audio Studio data | Low |
| Music `/music` | 70 % | No | List + preview | Low |
| Templates `/templates` | 70 % | No | Local catalog OK | Low |
| Effects `/effects` | 70 % | No | Local catalog OK | Low |
| Account `/account` | 80 % | No | Auth provider | Medium |
| About `/about` | 100 % | n/a | — | Low |
| Profile `/profile` | 30 % (stub) | No | Build out | Low |
| Billing `/billing` | 30 % (stub) | No | Payments provider | Medium |
| Subscription `/subscription` | 30 % (stub) | No | Plans + checkout | Medium |
| Usage `/usage` | 30 % (stub) | No | Metering | Low |
| Security `/security` | 30 % (stub) | No | 2FA / sessions | Low |
| Help `/help` | 30 % (stub) | No | Docs links | Low |
| Login / Signup / Forgot / Reset | 60 % UI | No | Auth provider | Medium |

---

*Report generated automatically from a read-only static audit of the
codebase. Source files inspected: 34 routes, 11 components, 7 lib
modules, 1 store, 1 types module, 1 styles entry — ~8,500 LOC.*
