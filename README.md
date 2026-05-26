# MinDost — Frontend

React + Vite + TypeScript client for the MinDost mental health platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Ant Design, MUI, Headless UI, Heroicons |
| Routing | React Router DOM v7 |
| HTTP Client | Axios (with JWT interceptor) |
| Auth | JWT (stored in `localStorage`) + Google OAuth redirect |

## Getting Started

### Prerequisites

- Node.js v20+

### Setup

```bash
npm install
cp .env.example .env
# Set VITE_API_URL to your backend URL
npm run dev
```

App runs on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
mindost-frontend/src/
├── assets/                  # Images and static files
├── components/
│   ├── Chat.tsx             # Text chat with AI (MinDost)
│   ├── Voice.tsx            # Browser-based voice chat
│   ├── Landing.tsx          # Main dashboard after login
│   ├── Login.tsx
│   ├── SignUp.tsx           # User signup with OTP verification
│   ├── Therapists.tsx       # Browse therapists
│   ├── Session.tsx          # Session history
│   ├── Settings.tsx
│   ├── Payment.tsx          # Razorpay payment flow
│   ├── DoctorDashboard.tsx
│   ├── DoctorBookings.tsx
│   ├── UserBookings.tsx
│   ├── Header.tsx
│   ├── Layout.tsx           # Sidebar layout wrapper
│   └── ui/
│       ├── DoctorsSignUp.tsx
│       ├── TherapistsProfile.tsx
│       └── ...
├── context/
│   └── AuthContext.tsx      # Global auth state (login, signup, OTP, profile)
├── lib/
│   └── axios.ts             # Axios instance with JWT + 401 interceptors
├── styles/
└── App.tsx                  # Routes + ProtectedRoute guard
```

## Auth Flow

1. **Email/Password signup** — OTP sent via Brevo → verified → account created
2. **Google OAuth** — redirects to `/api/auth/google`, returns JWT via query param to `/auth/callback`
3. **JWT** — stored in `localStorage.token`, attached to every request by the Axios interceptor
4. **Protected routes** — `ProtectedRoute` in `App.tsx` redirects unauthenticated users to `/login`

## Key Pages

| Route | Component | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/login` | Login | No |
| `/signup` | SignUp | No |
| `/doctor-signup` | DoctorsSignUp | No |
| `/landing` | Landing | Yes |
| `/chat` | Chat | Yes |
| `/voice` | Voice | Yes |
| `/therapists` | Therapists | Yes |
| `/session` | SessionHistory | Yes |
| `/bookings` | UserBookings | Yes |
| `/payment` | Payment | Yes |
| `/doctor-dashboard` | DoctorDashboard | Yes |
| `/doctor-bookings` | DoctorBookings | Yes |

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```
