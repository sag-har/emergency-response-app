# 🚨 Emergency Response App

A cross-platform **Emergency Response Mobile Application** developed during the **Friendsware Solutions Summer Internship 2026 (Track B – Mobile Application Development)**.

The application enables users to quickly report emergencies, submit SOS requests, track emergency responses, locate nearby hospitals, and manage their emergency history through an intuitive mobile interface.

---

# 📱 Project Overview

The Emergency Response App is designed to provide a fast and reliable way for users to request emergency assistance.

The project consists of:

* **Mobile Application** built with React Native (Expo)
* **RESTful Backend API** built with Node.js and Express
* **Database** using MongoDB or SQL Server
* **JWT Authentication** for secure access
* **Real-time emergency workflow** from request submission to tracking

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Secure Protected Routes
* Logout Functionality
* Persistent Login using AsyncStorage

---

## 🏠 Home Dashboard

* Emergency Dashboard

* Large SOS Button

* Emergency Categories

  * 🚑 Medical
  * 🔥 Fire
  * 🚔 Crime
  * 🚗 Accident

* Quick Navigation

---

## 🚨 Emergency Requests

* Submit SOS Request
* Emergency Type Selection
* Notes Input
* Current Location
* Request Confirmation
* Request Status

---

## 📍 Emergency Tracking

* Live Tracking Screen
* User Location
* Ambulance Marker
* ETA Display
* Emergency Status Updates

---

## 🏥 Hospital Finder

* Nearby Hospitals
* Distance Based Sorting
* Hospital Details

---

## 📜 Request History

* View Previous Emergency Requests
* Request Status
* Emergency Type
* Date & Time
* Loading & Empty States

---

## 👤 User Profile

* User Information
* Name
* Phone Number
* Logout

---

# 🛠 Technology Stack

## Mobile

* React Native (Expo)
* React Navigation
* Axios
* AsyncStorage
* React Native Maps

## Backend

* Node.js
* Express.js
* JWT Authentication
* REST API

## Database

* MongoDB / SQL Server

## Development Tools

* Visual Studio Code
* Android Studio
* Expo Go
* Postman
* Git & GitHub

---
## 📂 Project Structure

```text
emergency-response-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── README.md
│
├── mobile/
│   ├── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   ├── storage/
│   │   └── utils/
│   │
│   ├── App.js
│   ├── app.json
│   ├── eas.json
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── qa/
│
├── .gitignore
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/<repository>.git
```

---

## Mobile Setup

```bash
cd mobile

npm install

npx expo start
```

Run using:

* Expo Go
* Android Emulator
* iOS Simulator

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

JWT_SECRET=your_secret_key

DATABASE_URL=your_database_connection
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

## Emergency

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/api/emergency`              | Create Emergency Request |
| GET    | `/api/emergency/:id`          | Get Emergency Details    |
| GET    | `/api/emergency?userId=`      | User Request History     |
| GET    | `/api/emergency/:id/location` | Live Tracking            |

---

## Hospitals

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| GET    | `/api/hospitals/nearest` | Nearby Hospitals |

---

# 📱 Application Flow

```
Register
      │
      ▼
Login
      │
      ▼
Home Dashboard
      │
 ┌────┼─────────────┐
 │    │             │
 ▼    ▼             ▼
SOS History      Profile
 │
 ▼
Submit Emergency
 │
 ▼
Confirmation
 │
 ▼
Tracking
 │
 ▼
Hospital Finder
```

---

# 🧪 Testing

The project includes test cases covering:

* Registration
* Login
* Logout
* JWT Authentication
* SOS Submission
* Request History
* Tracking
* Hospital Finder
* Navigation
* Profile

---

# 👥 Team Members

| Member       | Responsibilities                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| **Member A** | Authentication, Registration, Login, JWT Authentication, Profile, Logout, QA Test Cases                      |
| **Member B** | Home Dashboard, SOS Module, Navigation, History, Confirmation Screen, Tracking UI, Hospital Finder UI        |
| **Member C** | Backend Development, REST APIs, Database Design, JWT Middleware, Hospital APIs, Project Setup, Documentation |

---

# 📄 License

This project was developed as part of the **Friendsware Solutions Summer Internship Program 2026** for educational and learning purposes.

---

## 👨‍💻 Developed By

**Friendsware Solutions Summer Internship 2026**

**Track B – Emergency Response Mobile Application**

Team Members:

* **Member A - Azhar**
* **Member B - Sana**
* **Member C - saghar**
