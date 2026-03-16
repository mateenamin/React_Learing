
// Data Fetching Kya Hai?
// Simple matlab: Server se data maango — screen pe dikhao
// Tera React App → Request bhejo → Server → Data aaya → Screen pe dikhao






// Tarike Hain:
// 1. Fetch API    → Browser built-in — koi install nahi
// 2. Axios        → Library — fetch se better
// 3. RTK Query    → Redux ke saath — automatic cache
// 4. React Query  → Sabse powerful — cache + refetch auto


// | Method | Kab Use | Fayda |
// |---|---|---|
// | `Fetch API` | Simple calls | Built-in — koi install nahi |
// | `Axios` | Most projects | Auto JSON + error + timeout |
// | `React Query` | Complex apps | Cache + auto refetch |
// | `RTK Query` | Redux apps | Redux ke saath perfect |




// Fetch API (Beginner Level)

// Sabse pehle Fetch API seekho. Ye browser built-in API hai.

// Features:

// Simple HTTP requests

// No extra library

// Basic GET / POST requests





// Concept 1 — Fetch API
// Simple matlab: Browser mein built-in hai — seedha use karo


jsx// Basic fetch
const response = await fetch('https://api.example.com/users');
const data     = await response.json();

// 2 steps hain:
// 1. fetch()       → response aata hai
// 2. .json()       → data nikalo response se


// **Problem — fetch mein:**

// ❌ Error automatically nahi pakadta
// ❌ 404 pe bhi error nahi throw karta
// ❌ Timeout nahi hota
// ❌ Request cancel nahi hoti





// Learn:

// GET request

// POST request

// Error handling

// Loading state