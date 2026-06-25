#  Emergency Response Mobile App

A React Native (Expo) mobile application for emergency assistance that provides:
- Login / Register system (UI ready)
- Emergency Home dashboard
- SOS & emergency features (planned)
- Navigation-based app structure

---

# 📁 Mobile App Structure

```

mobile/
│
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   └── RegisterScreen.js
│   │   └── Profilescreen.js
│   │
│   ├── services/
│   │   ├── api.js
|   |
│   ├── storage/
│   │   ├── authstorage.js
|   |
│   ├── utils/
│   │   ├── validation.js
|   |
│   ├── navigation/
│   │   └── AuthNavigator.js
│   │
│   ├── components/
│   ├── services/
│   └── utils/
│
├── App.js
├── app.json
├── package.json
└── index.js

````

---

# ⚙️ Installation

## 1️⃣ Go to mobile folder

```bash
cd mobile
````

---

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Install Expo required packages

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

---

## 4️⃣ Install navigation

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
```

---

## 5️⃣ Install Axios (for API integration later)

```bash
npm install axios
```

---

# ▶️ Run the App

## Start Expo development server

```bash
npx expo start
```

---

## Run on devices

* Press `a` → Android Emulator
* Scan QR → Expo Go App (Android/iOS)
* Press `w` → Web (if enabled)

---

# 📱 App Flow

```text
Home Screen (Guest View)
        ↓
Login Screen
        ↓
Register Screen
        ↓
Back to Home / Future Dashboard
```

---

# 🚀 Features (Current)

* ✅ Home Screen UI (Emergency themed)
* ✅ Login Screen UI
* ✅ Register Screen UI
* ✅ Navigation between screens

---

# 🧭 Navigation Setup

Uses React Navigation (Stack Navigator):

* HomeScreen
* LoginScreen
* RegisterScreen

---

# 🛠 Tech Stack

* React Native (Expo)
* React Navigation
* JavaScript (ES6+)

---



# 📲 Requirements

* Node.js (LTS recommended)
* Expo CLI
* Android Studio (optional emulator)
* Expo Go app (for testing on phone)

---

# 👥 Team Roles

* Member A → Authentication UI (Login/Register)
* Member B → UI/Navigation
* Member C → Backend APIs

---
