# Earth-Quake - Disaster Intelligence Platform

## 1. Concept & Vision

Earth-Quake is a life-saving disaster intelligence ecosystem that transforms how communities prepare for, respond to, and recover from natural disasters. It connects governments, rescue teams, and citizens through a unified alert system that works everywhere—from smartphones to basic feature phones. The platform embodies urgency without panic: clean, authoritative, and accessible to everyone regardless of technical literacy.

The visual language draws from emergency signage and meteorological maps—high contrast for instant readability under stress, warm earth tones (brown/terracotta) representing stability and groundedness, accented with urgent alert colors. Every element serves a single purpose: communicate clearly when seconds matter.

## 2. Design Language

### Aesthetic Direction
Emergency industrial meets modern civic design. Think: airport departure boards, weather radar interfaces, and disaster response command centers—but refined for consumer accessibility. Bold, confident typography. Information-dense but never cluttered. Dark mode default (battery conservation during emergencies) with high-contrast light mode available.

### Color Palette
```css
:root {
  /* Primary - Earth/Brown (stability, ground) */
  --primary-900: #1a0f0a;
  --primary-800: #2d1f15;
  --primary-700: #4a3228;
  --primary-600: #6b4c3a;
  --primary-500: #8b6b4d; /* Main */
  --primary-400: #a88868;
  --primary-300: #c4a585;
  --primary-200: #dcc7ae;
  --primary-100: #f0e6d6;
  
  /* Neutrals */
  --neutral-900: #0f0f0f;
  --neutral-800: #1a1a1a;
  --neutral-700: #2a2a2a;
  --neutral-600: #404040;
  --neutral-500: #5a5a5a;
  --neutral-400: #8a8a8a;
  --neutral-300: #b0b0b0;
  --neutral-200: #d0d0d0;
  --neutral-100: #f0f0f0;
  --neutral-50: #fafafa;
  
  /* Alert Levels */
  --alert-low: #22c55e;      /* Green - info */
  --alert-medium: #f59e0b;   /* Amber - warning */
  --alert-high: #ef4444;     /* Red - danger */
  --alert-critical: #dc2626; /* Deep red - critical */
  
  /* Accent */
  --accent-blue: #3b82f6;
  --accent-cyan: #06b6d4;
  
  /* Backgrounds */
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-elevated: #252525;
  --bg-card: #1f1f1f;
}
```

### Typography
- **Headlines**: `"DM Sans", "Calibri", system-ui` - Bold weight, tight tracking
- **Body**: `"Inter", "Segoe UI", system-ui` - Regular/Medium, relaxed line-height
- **Monospace/Data**: `"JetBrains Mono", "Consolas", monospace` - For coordinates, timestamps, IDs
- **Alert Text**: `"DM Sans"` at 700 weight, uppercase for maximum impact

### Spatial System
- Base unit: 4px
- Section padding: 64px vertical (desktop), 32px (mobile)
- Card padding: 24px
- Component gap: 16px
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Motion Philosophy
- **Alerts**: Immediate, attention-grabbing. Pulsing glow effects for critical alerts.
- **Transitions**: 200ms ease-out for UI state changes
- **Page transitions**: 300ms fade with subtle Y-translate
- **Data updates**: Subtle flash animation when values change
- **Loading states**: Skeleton screens with shimmer effect

### Visual Assets
- **Icons**: Lucide React - consistent stroke weight, clear at small sizes
- **Maps**: Mapbox GL for geographic visualization
- **Charts**: Recharts for data visualization
- **Decorative**: Subtle topographic/contour line patterns in backgrounds

## 3. Layout & Structure

### Information Architecture

```
Earth-Quake
├── Public Website (No Auth)
│   ├── Landing Page (/)
│   ├── Live Alerts Map (/alerts)
│   ├── Survival Guides (/guides)
│   ├── Register Interest (/register)
│   └── Login (/login)
│
├── Citizen Portal (/dashboard)
│   ├── My Location Alerts
│   ├── My Contacts
│   ├── Emergency Kit Checklist
│   └── Settings
│
└── Government Admin (/admin)
    ├── Alert Management
    ├── Region Dashboard
    ├── Resident Database
    ├── Bulk Communication
    ├── Shelter Management
    └── Rescue Coordination
```

### Page Structure Patterns

**Landing Page Flow:**
1. Hero: Bold tagline + current threat level indicator + CTA
2. Threat Overview: Live disaster map (India focus initially)
3. How It Works: 4-step visual journey
4. Alert System: Platform coverage (app, SMS, voice)
5. Survival Guides Preview: Category cards
6. Government Integration: Feature list
7. Emergency CTA: Register/ Download app
8. Footer: Links, emergency numbers, social

**Responsive Strategy:**
- Mobile-first design (320px minimum)
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Map: Full-bleed on all sizes, controls repositioned
- Navigation: Bottom bar on mobile, top nav on desktop
- Cards: Single column → 2 columns → 3-4 columns

## 4. Features & Interactions

### Public Features

#### Live Alert Map
- Real-time disaster markers on India map
- Filter by disaster type (flood, earthquake, cyclone, etc.)
- Click marker for detailed alert card
- Geolocation to show user's distance from events
- Auto-refresh every 60 seconds with visual indicator
- **States**: Loading (skeleton), Empty (no active alerts message), Error (retry button)

#### Alert Detail View
- Disaster type with icon and color coding
- Severity level with visual meter
- Time since detection and ETA to impact
- Affected areas as expandable list
- Safety instructions based on disaster type
- Nearby shelters with distance
- Share button (copy link, WhatsApp, SMS)
- **Interaction**: Tap anywhere outside to close, swipe to dismiss

#### Survival Guides
- Categorized by disaster type
- Step-by-step instructions with illustrations
- "Do" and "Don't" sections
- Offline-capable (PWA)
- Search functionality
- Bookmark for quick access
- **States**: Loading, Empty category, Search no results

#### Registration Flow
- Phone number as primary identifier (works for SMS)
- Optional: Name, email, location (for targeted alerts)
- Language preference (English, Hindi, regional)
- Consent checkbox for emergency communications
- Confirmation via OTP
- **States**: Input, OTP verification, Success, Error

### Citizen Dashboard Features

#### Personalized Alerts
- Alerts filtered by registered locations
- Push notifications on mobile app
- SMS fallback for critical alerts
- Alert history with read/unread status

#### Emergency Contacts
- Add up to 5 trusted contacts
- One-tap "I'm Safe" broadcast
- Share location with contacts during emergency

#### SOS Button
- Prominent, always-accessible button
- Long-press or rapid tap to activate
- Broadcasts GPS location to emergency services
- Confirmation vibration pattern

### Government Admin Features

#### Alert Creation Wizard
- Step 1: Select disaster type
- Step 2: Define affected region(s) (map selection)
- Step 3: Set severity and ETA
- Step 4: Compose message (template available)
- Step 5: Select delivery channels (SMS, Voice, App)
- Step 6: Review and broadcast
- Auto-save drafts every 30 seconds

#### Region Dashboard
- Real-time statistics per district
- Active alerts count by severity
- Shelter occupancy rates
- Recent activity log

#### Resident Database
- Search by name, phone, address
- Filter by registered locations
- Bulk import via CSV
- Export functionality
- **Privacy**: Data encryption, GDPR-like controls

#### Bulk Communication
- Compose message once
- Select recipients (all, region, group)
- Schedule delivery
- Delivery reports and analytics
- Character count for SMS (160 chars per segment)

#### Shelter Management
- Add/edit shelter locations
- Set capacity limits
- Real-time occupancy tracking
- Mark as open/closed/full
- Accessibility indicators

#### Rescue Coordination
- Live map of rescue team positions
- Task assignment system
- Status updates (en route, on site, completed)
- Communication log

### Error Handling

| Scenario | User Message | Action |
|----------|--------------|--------|
| Network offline | "You're offline. Showing cached data." | Show last sync time |
| Location denied | "Enable location for personalized alerts" | Settings deep link |
| SMS send failed | "Couldn't send SMS. Try again." | Retry button |
| Server error | "Something went wrong. We're on it." | Auto-retry in 30s |
| Rate limited | "Too many requests. Wait a moment." | Show countdown |

### Empty States

- **No alerts**: Map with India outline, "All clear across India" message
- **No guides bookmarked**: "Save guides for quick access during emergencies"
- **No contacts added**: "Add emergency contacts to keep them informed"
- **No shelter nearby**: "No registered shelters in your area"

## 5. Component Inventory

### Core Components

#### AlertCard
- **Default**: Type icon, title, severity badge, timestamp, location
- **Hover**: Subtle lift (translateY -2px), shadow increase
- **Expanded**: Full details, map preview, action buttons
- **Critical**: Pulsing red border glow animation

#### Button
- **Variants**: Primary (brown), Secondary (outline), Danger (red), Ghost
- **Sizes**: sm (32px), md (40px), lg (48px), xl (56px)
- **States**: Default, Hover (+brightness), Active (scale 0.98), Disabled (opacity 0.5), Loading (spinner)

#### Input
- **Default**: Border neutral-600, bg-elevated
- **Focus**: Border accent-blue, subtle glow
- **Error**: Border red, error message below
- **Disabled**: Opacity 0.5, cursor not-allowed

#### MapMarker
- **Flood**: Blue water drop icon
- **Earthquake**: Red seismograph icon
- **Cyclone**: Orange spiral icon
- **Drought**: Yellow sun icon
- **Fire**: Red flame icon
- **Size**: 32px default, 40px selected
- **Animation**: Subtle pulse for active alerts

#### SeverityMeter
- 5-segment horizontal bar
- Color gradient: green → yellow → orange → red → deep red
- Animated fill on load
- Numeric percentage label

#### Navigation
- **Desktop**: Horizontal top bar, logo left, links center, CTA right
- **Mobile**: Logo center, hamburger left, emergency button right
- **Active state**: Underline indicator, bold text
- **Scroll behavior**: Sticky with blur backdrop

#### AlertBanner
- Full-width, fixed at top
- Severity-colored background
- Dismissible with X button
- Auto-hide after 10s for low severity
- Persistent for high/critical

### Form Components

#### PhoneInput
- Country code prefix (+91)
- 10-digit validation
- Auto-format as user types
- Error state with red border

#### LocationPicker
- Map-based selection
- Current location button
- Search by address
- Lat/lng display in monospace

#### MessageComposer
- Rich text toolbar (bold, list)
- Character counter (SMS segments)
- Template insertion
- Preview mode

### Data Display

#### StatCard
- Large numeric value
- Label below
- Trend indicator (up/down arrow)
- Subtle background color coding

#### ActivityLog
- Timestamped entries
- Icon per action type
- Expandable details
- Infinite scroll pagination

#### ShelterCard
- Name and address
- Distance from user
- Occupancy bar (filled seats)
- Status badge (Open/Full/Closed)
- Tap for directions

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Prisma
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: Zustand (client), React Query (server)
- **Push**: Web Push API (mobile PWA)

### API Design

```
Public Endpoints:
GET  /api/alerts              - List active alerts
GET  /api/alerts/[id]         - Single alert detail
GET  /api/guides              - List survival guides
GET  /api/guides/[id]         - Single guide
POST /api/register            - Register phone number
POST /api/auth/verify-otp     - Verify OTP

Authenticated Endpoints:
GET  /api/user/profile        - User profile
PUT  /api/user/profile        - Update profile
GET  /api/user/contacts       - Emergency contacts
POST /api/user/contacts       - Add contact
POST /api/user/sos            - Trigger SOS

Admin Endpoints:
POST /api/admin/alerts         - Create alert
PUT  /api/admin/alerts/[id]    - Update alert
GET  /api/admin/residents      - List residents
POST /api/admin/residents      - Add resident
POST /api/admin/broadcast      - Bulk SMS/Voice
GET  /api/admin/shelters       - List shelters
POST /api/admin/shelters       - Add shelter
GET  /api/admin/analytics      - Dashboard stats
```

### Data Model

```prisma
// Core Entities
model Alert {
  id          String   @id @default(cuid())
  type        AlertType
  severity    Int      // 1-5
  title       String
  description String
  lat         Float
  lng         Float
  radius      Float    // km
  eta         DateTime?
  expiresAt   DateTime?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String
}

model Region {
  id        String   @id @default(cuid())
  name      String
  state     String
  district  String
  pincode   String?
  lat       Float
  lng       Float
  residents Resident[]
}

model Resident {
  id          String   @id @default(cuid())
  name        String
  phone       String   @unique
  email       String?
  language    String   @default("en")
  location    Json     // {lat, lng, address}
  regionId    String
  region      Region   @relation(fields: [regionId], references: [id])
  contacts    EmergencyContact[]
  alerts      AlertSubscription[]
  createdAt   DateTime @default(now())
  consent     Boolean  @default(false)
}

model EmergencyContact {
  id          String   @id @default(cuid())
  name        String
  phone       String
  residentId  String
  resident    Resident @relation(fields: [residentId], references: [id])
  createdAt   DateTime @default(now())
}

model Shelter {
  id          String   @id @default(cuid())
  name        String
  address     String
  lat         Float
  lng         Float
  capacity    Int
  occupied    Int      @default(0)
  status      ShelterStatus @default(OPEN)
  amenities   String[] // wifi, power, medical
  regionId    String
  createdAt   DateTime @default(now())
}

model AlertSubscription {
  id         String   @id @default(cuid())
  residentId String
  alertId    String
  isRead     Boolean  @default(false)
  alert      Alert    @relation(fields: [alertId], references: [id])
  resident   Resident @relation(fields: [residentId], references: [id])
}

model SurvivalGuide {
  id          String   @id @default(cuid())
  category    AlertType
  title       String
  content     Json     // {steps: [], dos: [], donts: []}
  imageUrl    String?
  isFeatured  Boolean  @default(false)
  order       Int      @default(0)
}

model AuditLog {
  id             String   @id @default(cuid())
  action         String
  userId         String?
  metadata       Json?
  ipAddress      String?
  createdAt      DateTime @default(now())
}

enum AlertType {
  FLOOD
  EARTHQUAKE
  CYCLONE
  DROUGHT
  FIRE
  TSUNAMI
  LANDSCAPE
  HEATWAVE
  COLDWAVE
}

enum ShelterStatus {
  OPEN
  FULL
  CLOSED
  EVACUATING
}
```

### Mobile App Strategy

For the mobile application, we have two options:

1. **PWA (Progressive Web App)**: Build once, works everywhere
   - Works offline
   - Push notifications
   - Add to home screen
   - No app store approval needed
   - Recommended for rapid deployment

2. **React Native**: Native app experience
   - Better performance
   - Native features (vibration, flashlight)
   - App store presence
   - Requires separate build process

**Recommendation**: Start with PWA for rapid deployment, then create React Native app for enhanced native features.

### Security Considerations

- All API routes validate input with Zod
- Rate limiting: 100 req/min per IP, 10 req/min for SMS
- Phone numbers hashed before storage
- Location data encrypted at rest
- Admin routes protected by role-based access
- Webhook signatures verified for external APIs
- CORS restricted to known origins
- CSP headers configured
- Audit logging for all data mutations

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- API response time: < 200ms (p95)
- Map load time: < 3s on 3G

## 7. Implementation Phases

### Phase 1: Core Infrastructure
- [x] Project setup (Next.js, Prisma, Tailwind)
- [x] Database schema
- [x] Authentication system
- [x] Base UI components

### Phase 2: Public Website
- [x] Landing page
- [x] Live alerts map
- [x] Survival guides
- [x] Registration flow

### Phase 3: Citizen Portal
- [x] Dashboard
- [x] Personalized alerts
- [x] Emergency contacts
- [x] SOS functionality

### Phase 4: Admin Panel
- [ ] Alert creation wizard
- [ ] Region management
- [ ] Resident database
- [ ] Bulk communication
- [ ] Shelter management
- [ ] Analytics dashboard

### Phase 5: Mobile App
- [ ] PWA setup
- [ ] Native notifications
- [ ] Offline support
- [ ] React Native build (optional)

### Phase 6: Integration
- [ ] Government weather APIs
- [ ] Seismic data feeds
- [ ] SMS gateway (Twilio)
- [ ] Voice call system
- [ ] AI risk analysis module
