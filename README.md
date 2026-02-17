# Full-Stack Assignment: Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, and collect votes in real-time.

## Live Demo

- **Public URL:** [Live link](https://full-stack-assignment-real-time-pol.vercel.app/)

## Tech Stack

- **Frontend:** Next.js (React), TailwindCSS
- **Backend:** Node.js, Express, WebSocket (`ws`)
- **Database:** PostgreSQL, Prisma ORM
- **Deployment:** Vercel (Frontend), Render (Backend)

## Features

- **Poll Creation:** Create polls with a question and multiple options (2-5 options).
- **Real-Time Updates:** Vote counts update instantly for all connected users without refreshing.
- **Link Sharing:** Shareable unique links for each poll.
- **Persistent Data:** Polls and votes are stored in a PostgreSQL database.
- **Responsive Design:** Works seamless across devices.

## Fairness & Anti-Abuse Mechanisms

To ensure fair voting and prevent abuse, the application implements the following mechanisms:

1.  **User Authentication Requirement:**
    - **Mechanism:** Users must be logged in to cast a vote.
    - **Prevention:** Prevents anonymous mass voting and ensures each vote is tied to a verified account ID.
    - **Implementation:** The backend verifies a valid JWT token via `authMiddleware` before processing any vote.

2.  **IP Address Restriction & Duplicate Vote Check:**
    - **Mechanism:** The system records the IP address of the voter and enforces a unique constraint on `{pollId, ipAddress}` as well as `{userId, pollId}`.
    - **Prevention:** Prevents a single user (even if they created multiple accounts) from voting multiple times on the same poll from the same device/network location. It also prevents the same account from voting twice.
    - **Limitation:** Users on shared networks (like office Wi-Fi) might be blocked if they share a public IP.

## Edge Cases Handled

- **Invalid Poll Data:** The backend validates that a poll has a question and between 2 to 5 options.
- **Duplicate Voting Attempts:** Gracefully handles attempts to vote again by returning specific error messages ("You have already voted in this poll from this device").
- **Concurrent Updates:** Uses database transactions/atomic operations implicitly via Prisma to ensure vote counts remain accurate even under load.
- **Network Resilience:** WebSockets automatically handle reconnections (client-side logic) to ensure users don't miss updates.

## Known Limitations & Future Improvements

- **Limitation:** Users on shared networks (like office Wi-Fi) might be blocked if they share a public IP.
- **Future Improvement:** We could use better methods (like checking browser details) to distinguish between different devices on the same network.
- **Scalability:** Currently uses a single WebSocket server instance. For massive scale (thousands of concurrent users), a Pub/Sub system (like Redis) would be needed to distribute messages across multiple server instances.
