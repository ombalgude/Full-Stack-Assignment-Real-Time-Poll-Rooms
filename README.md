# Full-Stack Assignment: Real-Time Poll Rooms

A full-stack web application for creating polls with real-time results. Users can create rooms, add polls, share links, and see live vote updates via WebSocket.

**Tech Stack**: Next.js, Express, PostgreSQL, Prisma, WebSocket

**Live Demo**: [Deployed URL](https://full-stack-assignment-real-time-pol.vercel.app/)

## Table of Contents

- [Features Implemented](#features-implemented)
- [Fairness & Anti-Abuse Mechanisms](#fairness--anti-abuse-mechanisms)
- [Edge Cases Handled](#edge-cases-handled)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)
- [Quick Start](#quick-start)
- [API Overview](#-api-overview)
- [Architecture](#architecture)

---

## Features Implemented

- **Poll Creation**: Create polls with 2-5 customizable options within organized rooms
- **Shareable Links**: Share room and poll URLs for easy collaboration
- **Real-Time Result Updates**: Live vote counts via WebSocket - see results update instantly
- **Fairness/Anti-Abuse Mechanisms**: Dual-layer duplicate vote prevention (User ID + IP Address)
- **Persistent Data Storage**: PostgreSQL database with Prisma ORM for reliable data persistence
  
---
## Fairness & Anti-Abuse Mechanisms

### 1. User ID-Based Duplicate Prevention

- **What**: Unique database constraint on `(userId, pollId)`
- **How**: Each authenticated user can vote only once per poll
- **Why**: Prevents users from voting multiple times across different devices

```typescript
// Enforced at database level + application check
@@unique([userId, pollId])
```

### 2. IP Address-Based Duplicate Prevention

- **What**: Unique database constraint on `(pollId, ipAddress)`
- **How**: Tracks IP address for each vote, handles proxies via `x-forwarded-for` header
- **Why**: Prevents multiple votes from same device/network, even for unauthenticated users

```typescript
// Captures real client IP behind proxies
const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
@@unique([pollId, ipAddress])
```

**Combined Protection**: These two mechanisms work together to prevent both authenticated abuse (same user, different devices) and unauthenticated abuse (same device, different users).

---

## Edge Cases Handled

1. **Concurrent Votes**: Database unique constraints handle race conditions atomically
2. **WebSocket Disconnects**: Automatic cleanup removes dead connections from subscriber map
3. **Invalid Poll Data**: Backend validates 2-5 options, rejects malformed requests
4. **Expired JWT Tokens**: Auth middleware catches expired tokens, returns clear 403 error
5. **Missing Environment Variables**: Server validates critical env vars on startup, fails fast with descriptive errors
6. **Connection Pool Exhaustion**: Pool configured with max 20 connections, 30s idle timeout
7. **Proxy IP Handling**: Checks `x-forwarded-for` header first, handles comma-separated IP lists
8. **CORS/WebSocket Origin**: Both HTTP and WS validate origins against whitelist

---

## Known Limitations & Future Improvements

### Current Limitations

1. **IP Tracking Bypass**: VPN users can circumvent IP-based duplicate prevention
   - _Fix_: Add browser fingerprinting or CAPTCHA verification

2. **No Vote Modification**: Users cannot change their vote after submission
   - _Fix_: Add "Change Vote" feature with configurable time window

3. **No Poll Expiration**: Polls remain active indefinitely
   - _Fix_: Add optional expiration date/time for polls

4. **Limited Analytics**: No voting trends or demographic data
   - _Fix_: Add analytics dashboard with time-series charts and CSV export

5. **No Email Verification**: Users can sign up without email, no password recovery
   - _Fix_: Add email field, verification flow, and password reset

6. **Single-Choice Only**: Only supports one option per vote
   - _Fix_: Add multiple-choice and ranked-choice poll types

7. **No Role-Based Access**: All users have same permissions
   - _Fix_: Implement Admin/Moderator/User roles with room-level permissions

8. **WebSocket Scalability**: In-memory subscriber map doesn't scale horizontally
   - _Fix_: Use Redis pub/sub for multi-instance WebSocket support

9. **No Rate Limiting**: Vulnerable to API abuse and DDoS
   - _Fix_: Add express-rate-limit middleware with per-IP and per-user limits

10. **No Search/Filter**: Hard to find specific polls in large collections
    - _Fix_: Add full-text search and filtering by date/votes/status

---

## Quick Start

### Setup

```bash
# Clone repository
git clone <repo-url>
cd Real-Time-Poll-Rooms

# Backend setup
cd backend
npm install
# Configure .env: DATABASE_URL, JWT_SECRET, FRONTEND_URL, PORT
npx prisma migrate deploy
npm run dev

# Frontend setup (new terminal)
cd frontend-server
npm install
# Configure .env.local: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_WS_URL
npm run dev
```

**Access**: Frontend at http://localhost:3001, Backend at http://localhost:3000

---

## 📡 API Overview

| Endpoint                      | Auth | Description      |
| ----------------------------- | ---- | ---------------- |
| `POST /api/v1/auth/signup`    | No   | Create account   |
| `POST /api/v1/auth/signin`    | No   | Login (get JWT)  |
| `POST /api/v1/rooms`          | Yes  | Create room      |
| `GET /api/v1/rooms`           | Yes  | Get user's rooms |
| `GET /api/v1/rooms/:id`       | No   | Get room details |
| `POST /api/v1/polls`          | Yes  | Create poll      |
| `GET /api/v1/polls/:id`       | No   | Get poll results |
| `POST /api/v1/polls/:id/vote` | Yes  | Cast vote        |

**WebSocket**: Connect to same server, send `{type: "join_room", roomId}` to receive real-time updates.

---

## Architecture

```
Frontend (Next.js) → API (Express) → Database (PostgreSQL)
                  ↘ WebSocket Server ↗
```

**Database Schema**: User → Room → Poll → Option → Vote (with unique constraints on userId+pollId and pollId+ipAddress)

---
