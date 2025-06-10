## 🖼️ Meme Generator App!

A cross-platform mobile application built using **React Native** (TypeScript) that allows users to generate, edit, and export memes with custom images and text. The app supports gesture-based interactions, including drag, pinch-to-zoom, and double-tap duplication.

---

### 📦 Tech Stack

* **React Native** with TypeScript
* **Zustand** for global canvas state management
* **React Navigation** for screen transitions
* **React Native Gesture Handler** + **Reanimated 2** for advanced gestures
* **React Native View Shot** to capture canvas
* **react-native-fs** for saving files to device storage

---

### 🚀 Features

| Feature                | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| 🖼️ Template Selection | Choose from predefined meme templates.                                          |
| ✍️ Add/Edit Text       | Add text, drag to reposition, long press to edit.                               |
| 🎨 Change Text Color   | Tap to cycle through available colors.                                          |
| ✌️ Duplicate           | Double-tap to duplicate any item (text/image).                                  |
| 📦 Add Image           | Insert draggable image blocks into canvas.                                      |
| 🗑️ Remove             | Remove the last selected item.                                                  |
| 🔄 Reset Canvas        | Clear all content and start fresh.                                              |
| 🔍 Zoom & Pan          | Use pinch to zoom and pan across canvas.                                        |
| 💾 Export              | Save the meme as an image to Downloads folder (Android) or Photo Library (iOS). |

---

### 📁 Project Structure

```
/src
  /components
    - CanvasControls.tsx
    - DraggableText.tsx
    - DraggableImage.tsx
    - ExportButton.tsx
    - MemeCanvas.tsx
    - MemeTemplateSelector.tsx
    - ResetButton.tsx
  /hooks
    - useCanvasStore.ts
  /constants
    - colors.ts
    - spacing.ts
  /screens
    - HomeScreen.tsx
    - CanvasScreen.tsx
App.tsx
```

---

### 🛠 Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/rivan-nfl/meme-generator-app.git
   cd meme-generator-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the project**

   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

4. **Link native modules**

   ```bash
   npx pod-install
   ```

---

### ⚙️ Permissions

**Android:**

Ensure these permissions are set in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
```

**iOS:**

Add this to `Info.plist`:

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>We need access to your photo library to save memes.</string>
```

---

### 🧪 Testing Guide

* Tap **Start Creating Meme** on HomeScreen to navigate.
* Select a template, add/edit text or image.
* Use gestures to move, zoom, or duplicate.
* Use Reset or Export to finish your meme creation.

---

### 📌 TODO / Improvements

* [ ] Snap-to-grid feature
* [ ] Support for custom image upload from gallery
* [ ] Animated transitions
* [ ] Undo/Redo support
* [ ] Share directly to social media