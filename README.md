# RadioTune

RadioTune is a simple React Native streaming radio app with a clean UI. It lets listeners browse stations, start a live stream, and view basic station info across iOS and Android.

## What the app does
- Plays live radio streams
- Shows a list of stations and details
- Simple, no‑login experience

## How to run (simple)

### 1) Install dependencies
```bash
cd /Users/parthshekhaliya/Desktop/MiDiFo_Projects/RadioTune
npm install
```

### 2) iOS (Simulator)
```bash
cd ios
pod install
cd ..

npx react-native run-ios --simulator "iPhone 15"
```

### 3) Android (Emulator)
```bash
npx react-native run-android
```

## Notes
- Streaming uses public radio URLs.
- If a stream buffers, switch stations and try again.
