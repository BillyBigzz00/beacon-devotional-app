# Beacon - Production Readiness TODO

## Critical / Blocking

- [ ] **Replace mock devotional data with a real content pipeline**
  - Currently all devotionals are hardcoded in `mocks/devotional.ts`
  - Need a backend service or CMS that ingests daily news articles and generates devotional content (headline, verses, reflection, premium reflection)
  - This is the single biggest blocker for a real launch

- [ ] **Pre-generate ElevenLabs audio server-side on a schedule**
  - Right now, TTS audio is generated on-demand when a user first requests it (see `backend/tts-cache.ts`)
  - The in-memory cache (`Map`) is lost on every server restart — audio must be re-generated
  - Need a persistent cache (e.g. R2, S3, or a database) and a daily cron/scheduled job that pre-generates audio for each new devotional *before* users open the app
  - This avoids the first-user-of-the-day paying the latency cost and ensures consistent ElevenLabs billing

- [ ] **Set up RevenueCat products in App Store Connect / Google Play Console**
  - `PurchaseContext.tsx` is wired up but no real products exist yet
  - Create subscription products (monthly + annual) in both stores
  - Configure the `premium` entitlement in RevenueCat dashboard
  - Test the full purchase flow with sandbox accounts

- [ ] **Configure push notifications**
  - `notificationTime` is stored in app state but no notification system is implemented
  - Need `expo-notifications` setup with permission requests, scheduling, and a server-side push service

- [ ] **Integrate a News API for real daily headlines**
  - All news headlines in mock data are fabricated — not sourced from real news
  - Need a news API (NewsAPI.org, GNews, AP API, or similar) to fetch real headlines daily
  - The content pipeline should select an appropriate headline, then generate the devotional around it
  - Budget ~$30-100/mo for a production news API depending on provider

- [ ] **Integrate a Bible API for verse text**
  - All verse text is currently hardcoded inline in mock data across 8 translations
  - Need a Bible API (API.Bible, Bolls.life, ESV API) to fetch accurate, licensed verse text
  - This ensures correctness, avoids copyright issues, and makes adding new translations trivial
  - Some translations (NIV, ESV, NLT, CSB) require commercial licensing agreements — a Bible API handles this for you
  - KJV and NKJV are public domain / more permissive

- [ ] **AI content generation pipeline**
  - Need an AI service (OpenAI, Anthropic, etc.) to generate daily devotional content:
    - Select a news headline from the news API
    - Choose relevant Bible verse references
    - Write a free reflection (~150 words) and premium reflection (~300 words)
    - Generate topic-aware reflection variants for each active topic series
  - This should run as a scheduled job (e.g. 4am ET daily) so content is ready before users wake up
  - Estimated cost: ~$1-5/day depending on model and output length

## Important

- [ ] **Add real Bible translation licensing / API**
  - Multiple translations are referenced (`niv`, `esv`, `csb`, `nlt`, `kjv`, etc.)
  - Some translations (NIV, ESV, NLT, CSB) require licensing agreements for commercial use
  - Consider using an API like API.Bible or ESV API for compliant verse delivery

- [ ] **Persistent audio cache**
  - Move from in-memory `Map` in `tts-cache.ts` to a durable storage solution
  - Options: object storage (R2/S3), database blob, or filesystem with CDN

- [ ] **Analytics and crash reporting**
  - No analytics or error tracking currently integrated
  - Consider Sentry for crash reporting, Mixpanel/Amplitude/PostHog for product analytics

- [ ] **Deep linking and universal links**
  - Share card generates a visual card but no deep link back into the app
  - Configure `expo-linking` with proper URL scheme and associated domains

- [ ] **Accessibility audit**
  - Add `accessibilityLabel`, `accessibilityRole`, and `accessibilityHint` props throughout
  - Test with VoiceOver (iOS) and TalkBack (Android)

- [ ] **Loading and empty states**
  - Some screens (History, Favorites) may lack polished empty states
  - Add skeleton loaders or shimmer effects for better perceived performance

- [ ] **Set up real backend infrastructure**
  - Currently using Hono + tRPC skeleton (`backend/`) but no database, no content generation pipeline
  - Need: database (e.g. Rork DB, Supabase, or Planetscale), daily cron job to ingest news + generate devotionals via AI, API endpoints for fetching today's content
  - The backend skill in Rork can bootstrap this — see `skills/backend/SKILL.md`

- [ ] **User accounts / authentication**
  - Currently all data is local-only via AsyncStorage — no user accounts exist
  - If a user deletes the app, all data (favorites, journal entries, streak, settings) is permanently lost
  - Need auth (e.g. Sign in with Apple, Google, email) to sync data across devices and protect against data loss
  - This also enables server-side features like personalized topic recommendations

- [ ] **Privacy policy and terms of service**
  - Required for both App Store and Google Play submission
  - Must cover: data collection (journal entries, favorites), third-party services (RevenueCat, ElevenLabs, news API, Bible API, AI generation)
  - Host on a public URL and link from Settings screen and app store listings

## Nice to Have

- [ ] **Offline support**
  - Cache today's devotional locally so it's available without network
  - Cache downloaded audio files on-device

- [ ] **Streak notifications**
  - Remind users to maintain their reading streak with a gentle daily push

- [ ] **Onboarding improvements**
  - Allow users to select preferred Bible translation during onboarding
  - Ask notification permission at an appropriate moment (not immediately)

- [ ] **Rate limiting on TTS endpoint**
  - The `/tts/:devotionalId` endpoint has no auth or rate limiting
  - Add basic protection to prevent abuse and unexpected ElevenLabs charges

- [ ] **App Store assets**
  - App icon, screenshots, preview video, metadata, privacy policy, terms of service

- [ ] **Automated testing**
  - No tests currently exist
  - Add unit tests for utility functions and integration tests for critical flows

- [ ] **Content moderation / editorial review process**
  - Once devotionals are auto-generated, need a review step before publishing
  - AI-generated reflections connecting news to Scripture need human oversight

- [ ] **Error handling for network failures**
  - App currently assumes mock data is always available — no real network error states
  - Need graceful handling when backend is unreachable, news API fails, or Bible API is down
  - Consider offline-first architecture: cache today's devotional on-device after first fetch

- [ ] **Topic series content generation**
  - Topic series (Anxiety & Peace, Grief & Comfort, etc.) need real multi-day devotional content
  - Currently only mock data exists for topics
  - Could be pre-generated in bulk (not daily) since they're not tied to news
  - 7 premium series × 14-30 days each = ~150 devotionals to generate
