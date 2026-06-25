# 🚨 Emergency Response App

A modern **React Native (Expo)** mobile application developed as part of the **Friendsware Solutions Summer Internship 2026 – Track B (Mobile Application)**.

The application provides a clean and intuitive emergency response interface where users can access emergency services, submit SOS requests, track emergency requests, view request history, and manage their profile.

---

# 📱 Features

## 🔐 Authentication

* User Registration
* User Login
* Secure Navigation Flow
* JWT Authentication Ready
* Protected Routes (Phase 2)

---

## 🏠 Home Dashboard

* Modern emergency dashboard
* Large SOS emergency button
* Quick Action cards:

  * 🚑 Medical
  * 🔥 Fire
  * 🚔 Crime
  * 🚗 Accident
* Emergency request shortcuts

---

# 🛠️ Technologies Used

## Frontend

* React Native
* Expo
* React Navigation
* Context API
* AsyncStorage
* Axios
* JavaScript (ES6+)

## Backend Integration

* Node.js
* Express.js
* SQL Server
* JWT Authentication
* REST API

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

Install required packages:

```bash
npm install axios
npm install @react-native-async-storage/async-storage --legacy-peer-deps
```

Start Expo:

```bash
npx expo start -c
```

Run the application using:

* Expo Go
* Android Emulator
* iOS Simulator (macOS)

---

# 🧪 Test Cases (Member B)

| Test Case ID | Scenario                       | Expected Result                        | Status |
| ------------ | ------------------------------ | -------------------------------------- | ------ |
| TC-01        | User taps Medical quick action | SOS screen opens with Medical selected | ✅ Pass |
| TC-02        | User submits empty notes       | Validation error displayed             | ✅ Pass |
| TC-03        | User submits SOS request       | Request successfully created           | ✅ Pass |
| TC-04        | API request fails              | User friendly error message displayed  | ✅ Pass |
| TC-05        | User opens History screen      | Previous requests displayed            | ✅ Pass |
| TC-06        | No emergency requests exist    | Empty state shown                      | ✅ Pass |
| TC-07        | Request submitted successfully | Confirmation screen displayed          | ✅ Pass |

---

# 📄 License

This project was developed for educational and internship purposes as part of the **Friendsware Solutions Summer Internship Program 2026**.
