# StageLink Kenya — Project Setup Guide

## Folder Structure

```
stagelink-kenya/
├── index.html                        ← Standalone HTML (open in browser, no setup needed)
├── react-components/
│   ├── App.jsx                       ← Main React app + all landing page components
│   ├── Dashboard.jsx                 ← Artist & Venue dashboards
│   ├── AdminDashboard.jsx            ← Admin panel (see below)
│   ├── BookingSystem.jsx             ← Full booking flow
│   ├── EventDiscovery.jsx            ← Events browse page
│   └── ReviewsRatings.jsx            ← Reviews & ratings system
└── README.md                         ← This file
```

---

## Quick Start (HTML version — zero setup)

Just open `index.html` in your browser. Everything works out of the box.

---

## React Setup

### 1. Create a new Vite + React project

```bash
npm create vite@latest stagelink-kenya -- --template react
cd stagelink-kenya
npm install
```

### 2. Install dependencies

```bash
npm install framer-motion react-router-dom lucide-react
```

### 3. Copy component files

Copy all `.jsx` files from `react-components/` into `src/`.

### 4. Replace `src/App.jsx` with the provided `App.jsx`

### 5. Copy the CSS from `index.html` `<style>` block into `src/App.css`

### 6. Run

```bash
npm run dev
```

---

## Full Stack Setup (Next.js + TypeScript)

### 1. Create Next.js project

```bash
npx create-next-app@latest stagelink-kenya --typescript --tailwind --eslint
cd stagelink-kenya
npm install framer-motion lucide-react @prisma/client prisma jsonwebtoken bcryptjs
```

### 2. Folder structure for Next.js

```
src/
├── app/
│   ├── page.tsx                 ← Landing page
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── dashboard/
│   │   ├── artist/page.tsx
│   │   └── venue/page.tsx
│   ├── search/page.tsx
│   ├── events/page.tsx
│   └── admin/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ArtistCard.tsx
│   ├── VenueCard.tsx
│   ├── AuthModal.tsx
│   └── ...
├── lib/
│   ├── db.ts                    ← Prisma client
│   ├── auth.ts                  ← JWT helpers
│   └── mpesa.ts                 ← M-Pesa Daraja API
└── api/
    ├── auth/
    ├── artists/
    ├── venues/
    └── bookings/
```

---

## Backend (Node.js + Express)

### 1. Init project

```bash
mkdir stagelink-api && cd stagelink-api
npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken pg prisma @prisma/client multer cloudinary
```

### 2. Prisma schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(FAN)
  createdAt DateTime @default(now())
  artist    Artist?
  venue     Venue?
}

enum Role {
  ARTIST
  VENUE
  FAN
  ADMIN
}

model Artist {
  id          String    @id @default(cuid())
  userId      String    @unique
  user        User      @relation(fields: [userId], references: [id])
  stageName   String
  realName    String
  bio         String?
  genre       String
  location    String
  fee         Int
  followers   Int       @default(0)
  rating      Float     @default(0)
  verified    Boolean   @default(false)
  bookings    Booking[]
  reviews     Review[]
  createdAt   DateTime  @default(now())
}

model Venue {
  id        String    @id @default(cuid())
  userId    String    @unique
  user      User      @relation(fields: [userId], references: [id])
  name      String
  location  String
  capacity  Int
  eventType String
  rating    Float     @default(0)
  verified  Boolean   @default(false)
  bookings  Booking[]
  reviews   Review[]
  createdAt DateTime  @default(now())
}

model Booking {
  id          String        @id @default(cuid())
  artistId    String
  artist      Artist        @relation(fields: [artistId], references: [id])
  venueId     String
  venue       Venue         @relation(fields: [venueId], references: [id])
  date        DateTime
  amount      Int
  status      BookingStatus @default(PENDING)
  eventName   String
  notes       String?
  createdAt   DateTime      @default(now())
}

enum BookingStatus {
  PENDING
  ACCEPTED
  REJECTED
  COMPLETED
}

model Review {
  id        String   @id @default(cuid())
  artistId  String?
  artist    Artist?  @relation(fields: [artistId], references: [id])
  venueId   String?
  venue     Venue?   @relation(fields: [venueId], references: [id])
  rating    Int
  comment   String
  createdAt DateTime @default(now())
}
```

### 3. Environment variables (`.env`)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/stagelink"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
MPESA_CONSUMER_KEY="your-mpesa-key"
MPESA_CONSUMER_SECRET="your-mpesa-secret"
MPESA_SHORTCODE="174379"
MPESA_PASSKEY="your-passkey"
STRIPE_SECRET_KEY="sk_test_..."
PORT=5000
```

---

## API Routes Reference

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login, returns JWT
- `POST /api/auth/forgot-password` — Send reset email

### Artists
- `GET /api/artists` — List all artists (with filters)
- `GET /api/artists/:id` — Single artist profile
- `POST /api/artists` — Create artist profile (auth required)
- `PUT /api/artists/:id` — Update profile
- `GET /api/artists/:id/bookings` — Artist's bookings

### Venues
- `GET /api/venues` — List all venues (with filters)
- `GET /api/venues/:id` — Single venue profile
- `POST /api/venues` — Create venue profile (auth required)
- `PUT /api/venues/:id` — Update profile

### Bookings
- `POST /api/bookings` — Create booking request
- `GET /api/bookings/:id` — Get booking details
- `PATCH /api/bookings/:id/accept` — Accept booking
- `PATCH /api/bookings/:id/reject` — Reject booking
- `GET /api/bookings/artist/:id` — Artist's bookings
- `GET /api/bookings/venue/:id` — Venue's bookings

### Payments
- `POST /api/payments/mpesa/stk-push` — Initiate M-Pesa payment
- `POST /api/payments/mpesa/callback` — M-Pesa callback
- `POST /api/payments/stripe/create-intent` — Stripe payment intent

---

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Railway)
```bash
# Push to GitHub, connect Railway to repo
# Set environment variables in Railway dashboard
railway up
```

### Database (Railway PostgreSQL or Supabase)
```bash
npx prisma migrate deploy
npx prisma db seed
```
