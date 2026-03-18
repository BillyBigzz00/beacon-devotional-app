# Beacon - Features Overview

Beacon is a daily devotional app that connects current news headlines to Scripture, providing relevant Bible verses and thoughtful reflections each day.

---

## Core Concept

Each day, a news article is selected and paired with relevant Bible verses and a written reflection. The app helps users see how Scripture speaks to the events happening in the world around them.

---

## Free Features

| Feature | Description |
|---|---|
| **Daily Devotional** | One new devotional each day with a news headline, 2 Bible verses, and a reflection |
| **Audio Narration (Device TTS)** | Listen to the daily reading using the device's built-in text-to-speech engine |
| **Bible Translation Selector** | Choose from 8 translations: NIV, ESV, CSB, NLT, KJV, NKJV, NABRE, RSV-CE |
| **Reflection Prompt** | A guided reflection modal to think deeper about the day's reading |
| **Share Card** | Generate a visual card of the daily verse to share on social media |
| **Favorites** | Save devotionals to revisit later |
| **Reading History** | View past devotionals (limited to **7 days**) |
| **Reading Streak** | Track consecutive days of reading |
| **Theme Support** | Light mode, dark mode, or follow system setting |
| **Onboarding** | Animated splash screen and onboarding flow for new users |
| **1 Free Topic** | Access to the "Gratitude & Joy" topical devotional series (14 days) |

---

## Premium Features

| Feature | Description |
|---|---|
| **Premium Audio (ElevenLabs)** | High-quality, natural-sounding narration powered by ElevenLabs AI voices (server-cached, no per-user cost) |
| **Extended Reflections** | Longer, deeper reflections with additional theological context, Hebrew/Greek word studies, and historical background |
| **Extended History** | View past devotionals up to **90 days** back (vs. 7 for free) |
| **Personal Journal** | Write journal entries tied to each devotional, with mood tracking, prayer requests, and gratitude notes |
| **Premium Topic Series** | Access to 7 additional topical devotional series (Anxiety & Peace, Grief & Comfort, Marriage & Love, Leadership & Calling, Forgiveness & Freedom, Identity & Worth, Provision & Trust) |

---

## Topic Series (Premium)

| Topic | Duration | Description |
|---|---|---|
| Anxiety & Peace | 30 days | Scripture's promises about peace and trusting God |
| Grief & Comfort | 21 days | Walking through loss with hope |
| Marriage & Love | 28 days | Building a Christ-centered relationship |
| Leadership & Calling | 21 days | Leading with wisdom and purpose |
| Forgiveness & Freedom | 21 days | The transformative act of forgiving and being forgiven |
| Identity & Worth | 14 days | Discovering your identity in Christ |
| Provision & Trust | 21 days | God's promises for financial uncertainty |

## Topic Series (Free)

| Topic | Duration | Description |
|---|---|---|
| Gratitude & Joy | 14 days | Cultivating a thankful heart |

---

## Monetization

- Subscriptions managed via **RevenueCat**
- Two plans: **Monthly** and **Annual**
- Entitlement key: `premium`
- Restore purchases supported
- Dev premium toggle available in Settings for testing (when RevenueCat is not connected)

---

## Audio Strategy

- **Free users**: Device text-to-speech (expo-speech) with best available voice auto-selected
- **Premium users**: ElevenLabs-generated audio streamed from the backend
- Audio is **cached server-side** per devotional to avoid redundant ElevenLabs API calls
- ElevenLabs is **never used for user-generated content** (journals, notes) to control costs
- Playback supports speed control (0.75x, 1x, 1.25x, 1.5x), pause/resume, and restart
