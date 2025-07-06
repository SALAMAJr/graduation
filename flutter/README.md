# Flutter App

This is the mobile frontend for the Graduation Project, built with [Flutter](https://flutter.dev/). It allows users to browse products, chat, place orders, request repairs, and interact with the platform's AI features.

---

## 📱 Features

- User authentication and registration
- Product browsing, search, and management
- Order placement and tracking
- Repair request submission
- Real-time chat with other users
- Notifications and alerts
- Reviews and ratings
- Integration with AI chatbot and image search

---

## 🛠️ Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install)
- Android Studio or Xcode (for emulators/simulators)
- A connected device or emulator

### Installation

```bash
cd flutter
flutter pub get
```

### Running the App

```bash
flutter run
```

- To run on a specific device:
  ```bash
  flutter run -d <device_id>
  ```
- To build for release:
  ```bash
  flutter build apk   # Android
  flutter build ios   # iOS
  ```

---

## 📁 Project Structure

```
flutter/
├── lib/
│   ├── core/
│   ├── data/
│   ├── generated/
│   ├── icons/
│   ├── presentation/
│   └── main.dart
├── assets/
│   ├── fonts/
│   └── images/
├── android/
├── ios/
├── web/
├── pubspec.yaml
└── ...
```

---

## 📝 Notes

- Configure API endpoints and environment variables as needed in the code.
- For push notifications, ensure Firebase or other services are set up.
- See parent [README.md](../README.md) for backend and AI module integration.

---

## 👤 Authors

- Mohamed Salama
- Mahmoud Etman
- Mohamed Ibrahim
