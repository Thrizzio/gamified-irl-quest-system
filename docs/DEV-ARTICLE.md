# StrideQuest — DEV article draft

**Tags:** `#devchallenge` `#hf26challenge`

## The problem

Outdoor time is good for attention, mood, and curiosity, but a fitness dashboard can turn a walk into another screen-based task. StrideQuest uses a different loop: choose a small invitation, put the phone away, notice something real, then use the phone briefly to preserve the moment.

## The expedition workflow

Choose one of seven short expeditions, inspect its safety notes, and start. StrideQuest tracks elapsed time independently from best-effort GPS samples. When a target is spotted, the user stops safely, photographs it, and receives the local model's actual top labels and confidence scores. If the model is uncertain or unavailable, the user can still keep a clearly labelled manual field note.

## Why local open-weight AI matters

The useful task is narrow and honest: compare a broad image-classification prediction with the labels allowed by the selected objective. Images do not need to travel to a paid inference endpoint. Once model assets have really been cached, the same workflow can work without a live inference service. Developers can inspect the model-loading boundary, replace the checkpoint, measure it on their own devices, and adapt the objective mapping within the model's licence terms.

The model weights, Transformers.js runtime, and StrideQuest application are separate artefacts with separate licensing considerations. A MobileNet ImageNet model is not described here as a specialist naturalist or universal identifier.

## Architecture

React/Vite provides the interface. IndexedDB stores observations, image Blobs, and sessions. localStorage stores small preferences and recoverable active-session state. A service worker caches the application shell. The camera uses `getUserMedia` only after a deliberate button press; the canvas creates a JPEG Blob without base64 localStorage inflation. GPS uses Haversine distance and rejects inaccurate/stationary drift. The model initializes lazily through Transformers.js v3 and is reused between verifications.

## Setup and offline demonstration

```bash
npm install
npm run dev
```

Use localhost or HTTPS. In Settings, prepare the local model while connected, wait for a successful ready state, then disconnect network access. Verify an image again and record the actual result. If any model asset was not cached, the app reports the model as unavailable and keeps manual recording usable. Do not claim offline inference based only on the presence of a service worker.

## Results to fill with real device evidence

| Device/browser | First model load | Inference samples/latency | Offline repeat | Notes |
|---|---:|---:|---|---|
| Add tested Android Chrome device | Measure | Measure | Yes / No | Add failures |
| Add tested desktop browser | Measure | Measure | Yes / No | Add backend (WebGPU/WASM) |

The repository's automated checks were run on Linux with Node v24.21.0 and npm 11.19.0. Browser/device model, camera, GPS, and offline benchmarks require a real secure-context browser and are deliberately not fabricated.

## Limitations

ImageNet labels are broad and can fail on real-world foliage, fungi, insects, birds, and structures. GPS updates can stop when the OS suspends the browser. Camera and geolocation require permissions. Browser storage quotas and model caching policies vary. A manual observation is a first-class fallback, and no distance is invented when samples are missing.

## Submission checklist

- [ ] Add deployed demo URL.
- [ ] Add source repository URL.
- [ ] Add screenshots or a short video.
- [ ] Run the offline model test on a real device and record actual measurements.
- [ ] Confirm model repository licence and final asset distribution terms.
- [ ] Submit through the official DEV challenge workflow before the deadline.
