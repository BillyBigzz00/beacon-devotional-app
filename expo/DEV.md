# Beacon - Developer Guide

## Tech Stack

- **Framework**: React Native with Expo SDK 54 (Expo Router for file-based routing)
- **Language**: TypeScript (strict)
- **State Management**: React Context via `@nkzw/create-context-hook` + React Query
- **Persistence**: AsyncStorage for local app state
- **Backend**: Hono + tRPC (deployed as serverless functions)
- **In-App Purchases**: RevenueCat (`react-native-purchases`)
- **TTS**: ElevenLabs API (server-side) with expo-speech as device fallback
- **Icons**: lucide-react-native
- **Package Manager**: bun (never use npm or yarn)

---

## Project Structure

```
app/                        # Expo Router pages
  _layout.tsx               # Root layout - providers, navigation stack
  (tabs)/                   # Tab navigator
    _layout.tsx             # Tab bar config (Today, History, Favorites, Settings)
    index.tsx               # Home / Today tab
    history.tsx             # Reading history
    favorites.tsx           # Saved devotionals
    settings.tsx            # App settings
  devotional.tsx            # Single devotional detail (modal)
  reflect.tsx               # Reflection prompt (modal)
  share.tsx                 # Share card generator (modal)
  journal.tsx               # Journal entry (modal)
  topics.tsx                # Topic series browser (modal)
  premium.tsx               # Premium upgrade screen (modal)

components/                 # UI components
  AudioPlayer.tsx           # Audio playback (ElevenLabs + speech fallback)
  DailySpotlight.tsx        # Main devotional card on home screen
  ShareCard.tsx             # Visual share card
  ReflectModal.tsx          # Guided reflection
  JournalScreen.tsx         # Journal entry form
  PremiumScreen.tsx         # Paywall / upgrade UI
  SettingsScreen.tsx        # Settings panel
  OnboardingScreen.tsx      # First-launch onboarding
  SplashAnimation.tsx       # Animated splash screen
  TopicsScreen.tsx          # Topic series list
  HistoryScreen.tsx         # History list
  FavoritesScreen.tsx       # Favorites list

contexts/                   # App-wide state
  AppContext.tsx             # Core app state (onboarding, theme, notes, journal, history, favorites, streak)
  PurchaseContext.tsx        # RevenueCat integration (offerings, purchase, restore, dev override)

constants/
  colors.ts                 # Light/dark theme color tokens
  translations.ts           # Bible translation list

mocks/
  devotional.ts             # Hardcoded devotional data (to be replaced with real backend)
  topics.ts                 # Topical series metadata

backend/
  hono.ts                   # Hono server entry (CORS, tRPC mount, TTS endpoints)
  tts-cache.ts              # In-memory ElevenLabs audio cache + generation
  trpc/
    app-router.ts           # tRPC router
    create-context.ts       # tRPC context factory
    routes/tts.ts           # tRPC TTS route

lib/
  trpc.ts                   # tRPC client setup

types/
  router.d.ts               # tRPC router type definitions
```

---

## Key Architecture Decisions

### State Management

Two context providers wrap the app (see `app/_layout.tsx`):

1. **AppProvider** (`contexts/AppContext.tsx`)
   - Manages all local app state: onboarding, theme, translation preference, notes, journal entries, history, favorites, streak
   - Persists to AsyncStorage under key `@beacon_app_state`
   - Provides computed values like `isDark`, `colors`, `historyDaysLimit`

2. **PurchaseProvider** (`contexts/PurchaseContext.tsx`)
   - Wraps RevenueCat SDK
   - Exposes `isPremium`, offerings, purchase/restore mutations
   - Has a `devPremiumOverride` toggle for testing without real IAP
   - A `PremiumSync` component bridges the two contexts (syncs RC premium status into AppContext)

Provider order (outermost to innermost):
```
trpc.Provider > QueryClientProvider > GestureHandlerRootView > AppProvider > PurchaseProvider
```

### Routing

- Expo Router with file-based routing
- 4 tabs: Today, History, Favorites, Settings
- Modals for: reflect, share, premium, journal, topics, devotional detail
- All modals use `presentation: 'modal'` with `slide_from_bottom` animation

### Audio System

The `AudioPlayer` component handles two audio sources:

1. **ElevenLabs (Premium)**: Requests audio from `/api/tts/:devotionalId` endpoint. The backend checks an in-memory cache first, then calls ElevenLabs if needed. Audio is streamed back as `audio/mpeg`.
2. **Device Speech (Free fallback)**: Uses `expo-speech` with voice auto-selection (prefers enhanced English male voices).

The audio player auto-falls back to device speech if ElevenLabs fails.

### Theming

- Two themes defined in `constants/colors.ts` (light + dark)
- Gold/navy palette — not the typical purple AI aesthetic
- Theme mode: system (follows device), light, or dark
- All components read colors from `useApp().colors`

---

## Environment Variables

| Variable | Where Used | Purpose |
|---|---|---|
| `EXPO_PUBLIC_REVENUECAT_TEST_API_KEY` | Client (dev/web) | RevenueCat test API key |
| `EXPO_PUBLIC_REVENUECAT_IOS_API_KEY` | Client (iOS prod) | RevenueCat iOS production key |
| `EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY` | Client (Android prod) | RevenueCat Android production key |
| `ELEVENLABS_API_KEY` | Backend only | ElevenLabs API authentication |
| `ELEVENLABS_VOICE_ID` | Backend only | ElevenLabs voice to use for narration |
| `EXPO_PUBLIC_RORK_API_BASE_URL` | Client | Base URL for the backend API |

---

## Backend Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/tts/:devotionalId?text=...` | Generate or return cached TTS audio (returns `audio/mpeg`) |
| GET | `/tts-status/:devotionalId` | Check if audio is cached for a devotional |
| * | `/trpc/*` | tRPC router |

---

## Running Locally

```bash
bun install
bun start          # Start with tunnel (for device testing)
bun start-web      # Start web version with tunnel
```

---

## Common Patterns

### Adding a new screen
1. Create the file in `app/` (or `app/(tabs)/` for a new tab)
2. If it's a modal, register it in `app/_layout.tsx` with `presentation: 'modal'`
3. Create the component in `components/`
4. Navigate with `router.push('/screen-name')`

### Checking premium status
```typescript
const { isPremium } = useApp();
// or for purchase actions:
const { isPremium, purchasePackage, monthlyPackage } = usePurchases();
```

### Reading theme colors
```typescript
const { colors, isDark } = useApp();
```

### Persisting new state
Add the field to the `AppState` interface and `DEFAULT_STATE` in `AppContext.tsx`. It will automatically persist via the existing `saveState` mechanism.
