# 🚨 Emergency Response App

A modern **React Native (Expo)** mobile application developed as part of the **Friendsware Solutions Summer Internship 2026 – Track B (Mobile Application)**.

The application provides a clean and intuitive emergency response interface where users can access emergency services, submit SOS requests, view their emergency history, and manage their profile.

---

# 📱 Features

## 🔐 Authentication

* User Registration
* User Login
* Secure navigation flow

## 🏠 Home Dashboard

* Modern emergency dashboard
* Large SOS emergency button
* Quick Action cards

  * 🚑 Medical
  * 🔥 Fire
  * 🚔 Crime
  * 🚗 Accident

## 🚨 SOS Module

* One tap SOS access
* Emergency type selection
* Additional notes input
* SOS submission confirmation

## 📜 History

* Displays previously submitted emergency requests
* Stores emergency type, notes, and submission time
* Latest requests displayed first

## 👤 Profile

* Displays logged in user information
* User name
* Email address
* Prepared for backend integration

## 🎨 User Interface

* Responsive React Native design
* Consistent spacing and typography
* Emergency themed color palette
* Mobile friendly navigation
* Clean card based layout

---

# 🛠️ Technologies Used

* React Native
* Expo
* React Navigation
* JavaScript (ES6+)
* Context API
* AsyncStorage (planned)
* Node.js Backend (integration ready)

---

# 📂 Project Structure

```
src/
│
├── components/
├── context/
│   └── AppContext.js
│
├── navigation/
│   ├── AuthNavigator.js
│   └── MainNavigator.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreenB.js
│   ├── SOSScreen.js
│   ├── HistoryScreen.js
│   └── ProfileScreen.js
│
├── services/
├── styles/
└── utils/
```

---

# 🚀 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the mobile project:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Run the application using:

* Expo Go
* Android Emulator
* iOS Simulator (macOS)

---

# 📌 Application Flow

```
Landing Screen
        │
        ▼
 Login Screen
        │
        ▼
Main Dashboard
        │
 ┌──────┼───────────────┐
 │      │               │
 ▼      ▼               ▼
Home  History        Profile
 │
 ▼
SOS Button / Quick Actions
 │
 ▼
SOS Form
 │
 ▼
Submit Emergency
 │
 ▼
History Updated
```

---

# 🧪 Test Cases (Member B)

| Test Case ID | Scenario                                      | Expected Result                                  | Status |
| ------------ | --------------------------------------------- | ------------------------------------------------ | ------ |
| TC-01        | User taps **Medical** quick action            | SOS screen opens with Medical emergency selected | ✅ Pass |
| TC-02        | User taps **Fire** quick action               | SOS screen opens with Fire emergency selected    | ✅ Pass |
| TC-03        | User presses **SOS** button and submits notes | Emergency request is submitted successfully      | ✅ Pass |
| TC-04        | User submits an SOS request                   | Submitted request appears in the History screen  | ✅ Pass |
| TC-05        | Logged in user opens Profile                  | Correct user information is displayed            | ✅ Pass |

---

# 🎯 Future Improvements

* GPS location sharing
* Real time emergency tracking
* Nearby hospital finder
* Emergency contact management
* Push notifications
* Backend API integration
* Persistent history using AsyncStorage or database
* Cloud synchronization

---

# 👨‍💻 Member B Responsibilities

* Bottom Tab Navigation
* Home Dashboard
* SOS Screen
* Emergency Quick Actions
* History Screen
* Profile Screen
* UI/UX Design
* Navigation & SOS Test Cases

---

# 📄 License

This project was developed for educational and internship purposes as part of the **Friendsware Solutions Summer Internship Program 2026**.
