# 🚨 Emergency Response App

A modern mobile application built with **React Native** that helps users quickly request emergency assistance, select nearby hospitals, track emergency requests, and manage their profile.

---

## 📱 Project Overview

The Emergency Response App is designed to reduce emergency response time by allowing users to send SOS requests, select hospitals, monitor request status, and receive assistance through a simple and user friendly interface.

---

# ✨ Features

## 🔐 Authentication

* User Login
* User Registration
* Secure Authentication
* Session Management

## 🏠 Home Screen

* Quick SOS Button
* Emergency Categories
* Emergency Statistics
* Beautiful Modern UI

## 🚑 Emergency Request

* Create Emergency Request
* Select Emergency Type
* Add Emergency Description
* Send SOS Request
* Automatic Request ID Generation

## 🏥 Hospital Selection

* Display Nearby Hospitals
* Hospital Information
* Phone Number
* Hospital Assignment

## 📍 Emergency Tracking

* Live Emergency Status
* Request Details
* Hospital Information
* Status Updates
* Refresh Tracking
* Safety Tips

## 📜 Emergency History

* View Previous Emergencies
* Emergency Status
* Date & Time
* Request Information

## 👤 Profile

* User Information
* Logout

---

# 🛠 Technologies Used

### Frontend

* React Native
* React Navigation
* JavaScript
* React Hooks

### Backend

* Node.js
* Express.js

### Database

* Microsoft SQL Server

### API

* REST API

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/sag-har/emergency-response-app.git
```

---

## Install Dependencies

### Mobile

```bash
cd mobile
npm install
```

### Backend

```bash
cd backend
npm install
```

---

## Configure Environment

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

DB_USER=sa
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_DATABASE=EmergencyResponseDB
JWT_SECRET=your_secret_key
```

---

## Start Backend

```bash
npm run dev
```

---

## Start Mobile

```bash
npx expo start
```

---

# 📱 Application Flow

```
Login/Register
        │
        ▼
Home Screen
        │
        ▼
Create Emergency
        │
        ▼
Select Hospital
        │
        ▼
Track Emergency
        │
        ▼
Emergency Completed
        │
        ▼
History
```

---

# 🧪 Testing

| Test Case        | Expected Result                | Status |
| ---------------- | ------------------------------ | ------ |
| User Login       | User logs in successfully      | ✅ Pass |
| Create Emergency | Emergency request created      | ✅ Pass |
| Select Hospital  | Hospital assigned successfully | ✅ Pass |
| Track Emergency  | Status displayed correctly     | ✅ Pass |
| View History     | Previous emergencies displayed | ✅ Pass |

---

# 📸 Screens Included

* Login
* Register
* Home
* SOS
* Hospital Selection
* Emergency Tracking
* History
* Profile

---

# 🔒 Security Features

* JWT Authentication
* Protected API Routes
* Input Validation
* Secure Database Connection
* Error Handling

---

# 👩‍💻 Developer

**Sana Batool**

---

# 📄 License

This project is developed for educational purposes as a Final Year/University Software Engineering project.

© 2026 Sana Batool. All Rights Reserved.
