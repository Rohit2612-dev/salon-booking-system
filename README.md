# 💇‍♂️ Salon Booking System

A **Full Stack Web Application** that allows salon administrators to manage services, staff, users, and bookings efficiently.
This project is built using **React for the frontend** and **Spring Boot for the backend**, with REST APIs connecting both layers.

---

# 🚀 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Spring Boot
* Java
* REST API

### Database

* MySQL

---

# 📁 Project Structure

```
salon-booking-system
│
├── SalonApplication        # Spring Boot Backend
│   ├── src
│   ├── pom.xml
│   └── target
│
├── salon-frontend          # React + Vite Frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ✨ Features

* User Management
* Staff Management
* Service Management
* Booking Management
* Dashboard for admin
* REST API integration
* Responsive UI

---

# ⚙️ How to Run the Project

## 1️⃣ Run Backend (Spring Boot)

Navigate to backend folder:

```
cd SalonApplication
```

Run the Spring Boot application:

```
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

## 2️⃣ Run Frontend (React)

Navigate to frontend folder:

```
cd salon-frontend
```

Install dependencies:

```
npm install
```

Run the application:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🔗 API Communication

The React frontend communicates with the Spring Boot backend through REST APIs.

Example:

```
GET /api/users
GET /api/services
POST /api/bookings
```

---

# 🧑‍💻 Author

**Rohit Taksande**

GitHub:
https://github.com/Rohit2612-dev

---

# 📌 Future Improvements

* Authentication & Authorization (JWT)
* Online payment integration
* Email notifications
* Customer booking portal
* Deployment on cloud

---
