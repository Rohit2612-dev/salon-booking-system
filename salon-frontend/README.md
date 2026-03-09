# LuxeCut — Salon Frontend (React + Vite)

A complete frontend for the Salon Management Spring Boot backend.

## 🚀 Setup

### Prerequisites
- Node.js 18+
- Your Spring Boot backend running on `http://localhost:8080`

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

---

## 📡 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a user |
| GET | `/api/users` | Get all users |
| POST | `/api/services` | Add a service |
| GET | `/api/services` | Get all services |
| POST | `/api/staff` | Add staff |
| GET | `/api/staff` | Get all staff |
| PUT | `/api/staff/{id}` | Update staff |
| DELETE | `/api/staff/{id}` | Delete staff |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/{id}` | Get booking by ID |
| PUT | `/api/bookings/{id}` | Update booking |
| DELETE | `/api/bookings/{id}` | Delete booking |

> **Note:** If your Spring Boot API has CORS issues, add this to your Spring Boot main class or a config class:
> ```java
> @CrossOrigin(origins = "http://localhost:5173")
> ```
> Or add a global CORS config bean.

---

## 🗂 Project Structure

```
src/
├── components/
│   └── Sidebar.jsx        # Navigation sidebar
├── pages/
│   ├── Dashboard.jsx      # Overview with stats
│   ├── UsersPage.jsx      # User registration & list
│   ├── ServicesPage.jsx   # Service management
│   ├── StaffPage.jsx      # Staff CRUD
│   └── BookingsPage.jsx   # Booking CRUD
├── services/
│   └── api.js             # All API calls
├── App.jsx
├── main.jsx
└── index.css
```

## 🏗 Build for Production

```bash
npm run build
```
Output in `dist/` folder.
