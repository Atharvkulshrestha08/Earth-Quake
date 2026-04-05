# Earth-Quake 🌍

**A life-saving disaster intelligence ecosystem that transforms how communities prepare for, respond to, and recover from natural disasters.**

Earth-Quake connects governments, rescue teams, and citizens through a unified alert system that works everywhere—from smartphones to basic feature phones. It provides real-time alerts, survival guides, and emergency coordination tools in an accessible, high-contrast, and fast interface.

---

## 🚀 Features

### 🌐 Public Access
- **Live Alert Map**: Real-time disaster markers with severity indicators on an interactive map.
- **Alert Details**: Time-sensitive instructions, nearby shelters, ETA to impact, and sharing options.
- **Survival Guides**: Categorized step-by-step guides for various disasters, designed for offline access.
- **Emergency Registration**: Quick SMS-based registration for instant critical updates.

### 🧑‍🤝‍🧑 Citizen Portal
- **Personalized Alerts**: Location-based filtering for relevant warnings.
- **Emergency Contacts**: Manage trusted contacts and use the one-tap "I'm Safe" broadcast.
- **SOS Button**: Instantly broadcast GPS location to emergency services.

### 🏢 Government Admin (In Progress)
- **Alert Management**: Create and broadcast disaster warnings via SMS, Voice, and App notifications.
- **Region & Shelter Dashboard**: Real-time stats on occupancy, resources, and resident safety.
- **Rescue Coordination**: Map-based live tracking of rescue teams and statuses.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: PostgreSQL (serverless via Neon) & [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (@auth/prisma-adapter)
- **Styling UI**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Data Visualization & GIS**: Mapbox GL JS & Recharts
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand (client) & React Query (server)

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and npm/yarn installed. You will also need a PostgreSQL database instance (e.g., Neon).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd earthquake
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy the example environment file and configure your credentials.
   ```bash
   cp .env.example .env.local
   ```
   *Make sure to provide your `DATABASE_URL`, `NEXTAUTH_SECRET`, and Mapbox keys in the `.env.local` file.*

4. **Database Setup**:
   Generate the Prisma client and push the schema to your database.
   ```bash
   npm run db:push
   npm run db:generate
   ```
   *To view data locally, use `npm run db:studio`.*

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open https://earth-quake-kappa.vercel.app/ in your browser to view the application.

---

## 🗺️ Project Roadmap

- **Phase 1**: Core Infrastructure & Auth ✅
- **Phase 2**: Public Website & Map ✅
- **Phase 3**: Citizen Portal ✅
- **Phase 4**: Government Admin Panel 🚧
- **Phase 5**: Mobile App (PWA & React Native) 🚧
- **Phase 6**: External API Integrations (Weather, Seismic, SMS) 🚧

---

## 📄 License
This project is proprietary as part of the Earth-Quake Platform initiative.
