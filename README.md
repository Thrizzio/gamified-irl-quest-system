# StrideQuest

StrideQuest is a local-first outdoor scavenger-hunt PWA for the DEV Hacktoberfest Week 1 **Touch Grass** challenge. It turns a short walk through a park, trail, garden, or city block into a lightweight field expedition: choose a target, put the phone away, photograph something only after stopping safely, and build a personal journal of what you noticed.

Challenge tags: `#devchallenge` `#hf26challenge`

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL in a modern browser. Production checks are:

```bash
npm test
npm run build
npm run preview
```

Camera, GPS, wake lock, and service-worker behavior require HTTPS when deployed. `localhost` is treated as a secure context by browsers during development.

## What is implemented

- Dashboard with level/XP progress, a daily invitation, recent field notes, collection progress, measured distance, and local-model readiness.
- Seven data-driven expeditions: Forest Floor, Waterside Explorer, Urban Nature, Seasonal Scout, Rock & Mineral Hunt, Wildlife Watch, and Micro-Adventure.
- 38 catalogue entries spanning foliage, trees, flowers, fungi, geology, water, wildlife, seeds, and outdoor structures. Expedition objective references are validated by tests.
- Run mode with elapsed time, pause/resume, completion, session recovery after reload, objective progress, best-effort GPS distance, permission status, and Screen Wake Lock when supported.
- Explicit stop-before-camera workflow using `getUserMedia`, environment-camera preference, canvas capture, file fallback, retake, and stream cleanup.
- Genuine browser-side Transformers.js v3 inference path, confidence-aware objective matching, top predictions, uncertain/error states, and clearly labelled manual recording/demo mode.
- IndexedDB persistence for observations, session history, and image Blobs. Lightweight preferences use localStorage. Photos are never put in localStorage.
- Search and filters for expeditions and catalogue entries, discovered/undiscovered silhouettes, category completion, rarity, details, local photo deletion, and versioned JSON backup import/export.
- Deterministic XP, repeat-sighting rewards, level formula, and eight earned/not-yet-earned field badges.
- Responsive light/dark field-guide interface, keyboard-focus states, semantic labels, reduced-motion support, safety copy, manifest, SVG icon, and service worker shell cache.

## Architecture

```text
src/
├── App.jsx                 product shell and screen composition
├── data/                   catalogue, expeditions, badge definitions
├── hooks/                  active expedition, GPS, vision, local state
├── lib/                    IndexedDB, inference, preferences, distance, progression, validation
├── index.css               tokens, responsive layouts, illustrations, motion
└── test/                   progression, distance, catalogue, backup validation
public/
├── manifest.webmanifest
├── icons/icon.svg
└── sw.js
```

The core entities are separate: catalogue definitions do not contain user state; observations refer to a stable collectible ID; sessions refer to an expedition template; image blobs are held in their own IndexedDB object store.

### Progression

`level = floor(max(0, XP) / 250) + 1`. A first discovery earns the collectible's base XP; a repeat sighting earns 20% rounded up; a successful genuine verification adds 10 XP. Expedition completion gives its template reward plus small objective and verification bonuses. First-discovery state is recorded per observation and does not grant the full reward a second time.

## Local AI model

The configured model is:

```text
onnx-community/mobilenetv4_conv_small.e2400_r224_in1k
```

The app uses `@huggingface/transformers` 3's `pipeline('image-classification', ...)`, preferring WebGPU when the browser exposes it and otherwise requesting the WASM backend. Initialization is lazy and shared, so visiting the dashboard does not download model assets. The model status is visible in Settings and the dashboard.

This is a broad ImageNet classifier, not a nature-specialist model. StrideQuest only maps labels that are defensible for the selected objective and uses a confidence threshold; an inference failure or weak result never receives an AI-verified status. The model cannot reliably identify every tree species, mushroom, landmark, or quest target. Manual observations remain valid and are explicitly labelled.

Model repository licensing and redistribution terms should be checked from the model repository metadata before redistributing model files. The Transformers.js library is Apache-2.0; StrideQuest application code is provided in this repository. No image is sent to a remote inference endpoint.

### Reproducible AI demonstration

1. Start the app and open Settings → **Prepare local model** while connected.
2. Open an expedition and start it. The first geolocation request occurs here, not on the dashboard.
3. Stop somewhere safe, choose **Verify a discovery**, select the target, and capture a photo.
4. Review the top labels and confidence scores. Record only if the result is useful; weak/error states offer an unverified record.
5. After the model finishes downloading, use browser DevTools Network throttling or disconnect the network and repeat. The app shell and model runtime can be tested offline only if the browser has actually cached every model asset; the UI never claims readiness before a successful load.

### Results and limitations table

| Measurement | Result in this repository | How to measure |
|---|---|---|
| Initial model download size | Not measured in this headless build run; the production build emitted a 21.6 MB ONNX Runtime WASM asset, which is not the model weight size | Browser DevTools Network while pressing “Prepare local model” |
| Model initialization time | Not measured; requires a real browser/device and first download | Performance panel around Settings preload |
| Inference latency | Not measured; varies by WebGPU/WASM device and image | Performance panel across several local photos |
| Offline inference | Not claimed as verified here | Load once, confirm cached assets, disconnect, run a second verification |
| Model unavailable | Implemented: manual recording remains available and cannot become AI verified | Block model request or use unsupported browser |
| Tested environment | Automated tests/build: Node v24.21.0, npm 11.19.0, Linux container; browser camera/GPS/model benchmarks were not available | Repeat checklist on Android Chrome for submission evidence |
| Known failures | Broad ImageNet labels can miss foliage, fungi, structures, and wildlife; low light, occlusion, and unfamiliar views reduce confidence | Use manual observation and document sample images |

Do not present the table's unmeasured fields as benchmark claims. The first-run model download may require network access, and browser cache behavior differs by device.

## Offline, privacy, permissions, and safety

After the app shell is cached, dashboard, expedition definitions, run timing, journal, history, settings, backup, and existing local images work without a backend. Model inference is offline only after the model, tokenizer/configuration, ONNX runtime, and all related assets have successfully loaded and remain in browser cache. Camera/GPS still depend on browser permission and device hardware. The service worker uses a versioned shell cache and network fallback; it does not pretend to cache a large model automatically.

Photos and GPS samples remain in local browser storage. Exports include observation/session metadata but not image blobs or GPS coordinates by default. There is no account, analytics, cloud sync, remote AI endpoint, telemetry, or fabricated route/step/calorie data. Clearing local data is an explicit destructive action; exported backups are versioned and validated before import.

The app reminds users to stop before using the camera, avoid unknown plants/fungi, never approach or disturb wildlife/nests, keep away from unsafe water/edges, and leave natural materials in place. GPS tracking and Wake Lock are best-effort: a mobile OS can suspend a browser, and StrideQuest never invents distance during missing samples.

## Submission readiness

For a DEV submission, add the deployed demo URL, source repository URL, screenshots or a short walkthrough video, and real device measurements to the challenge article. A draft article outline is in [`docs/DEV-ARTICLE.md`](docs/DEV-ARTICLE.md). This repository intentionally does not deploy or create external resources.

## Verification performed

The following commands were run successfully in this workspace:

```text
npm install
npm test       # 4 files, 6 tests passed
npm run build  # Vite production build passed
npm run dev -- --host 127.0.0.1 + curl / and /manifest.webmanifest # HTTP 200
```

The production build reports a large chunk warning because Transformers.js and ONNX Runtime are included in the browser bundle. This is a performance tradeoff worth addressing with further code splitting; it does not block the build.
