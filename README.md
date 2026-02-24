# ShopClone - E-Commerce Application

A full-featured, client-side e-commerce application built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. ShopClone provides a complete shopping experience including product browsing, cart management, checkout, order history, and user authentication -- all powered by browser localStorage for persistence.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Run Locally](#how-to-run-locally)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [State Management](#state-management)
- [Data Models](#data-models)
- [Product Catalog](#product-catalog)
- [Authentication](#authentication)
- [Cart & Orders](#cart--orders)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Limitations & Future Improvements](#limitations--future-improvements)

---

## Features

- **Product Catalog** -- Browse 13 products across 4 categories (Electronics, Clothing, Home, Books) with category filtering
- **Product Detail Pages** -- View full product information with images, descriptions, pricing, stock status, and quantity selection
- **Shopping Cart** -- Add, remove, and update item quantities with persistent per-user storage
- **Checkout Flow** -- Review order summary with shipping and payment details, then place orders
- **Order History** -- View all past orders with status badges, item details, and "Buy Again" functionality
- **User Authentication** -- Sign up and sign in with email/password validation, session persistence, and protected routes
- **Responsive Design** -- Mobile-first layout using Tailwind CSS utility classes
- **Toast Notifications** -- Auto-dismissing success messages for user actions
- **Loading Skeletons** -- Smooth loading states for product listings and detail pages
- **404 Handling** -- Custom not-found page for invalid product IDs

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 14.2.35 (App Router)       |
| Language       | TypeScript 5                        |
| UI Library     | React 18                            |
| Styling        | Tailwind CSS 3.4.1                  |
| State Mgmt     | React Context API                   |
| Data Storage   | Browser localStorage                |
| Fonts          | Geist Sans & Geist Mono (local)     |
| Linting        | ESLint with Next.js + TypeScript    |
| Build Tool     | Next.js built-in compiler           |

---

## Project Structure

```
e-commerce/
├── app/                              # Next.js App Router pages
│   ├── layout.tsx                    # Root layout with providers & fonts
│   ├── page.tsx                      # Home page (product listing)
│   ├── loading.tsx                   # Home page loading skeleton
│   ├── globals.css                   # Global styles & CSS variables
│   ├── cart/
│   │   └── page.tsx                  # Shopping cart page
│   ├── checkout/
│   │   ├── page.tsx                  # Checkout page
│   │   └── success/
│   │       └── page.tsx              # Order confirmation page
│   ├── orders/
│   │   └── page.tsx                  # Order history page
│   ├── product/[id]/
│   │   ├── page.tsx                  # Product detail (server component)
│   │   ├── ProductDetail.tsx         # Product detail (client component)
│   │   ├── loading.tsx               # Product page loading state
│   │   └── not-found.tsx             # 404 for invalid product IDs
│   ├── signin/
│   │   └── page.tsx                  # Sign in page
│   └── signup/
│       └── page.tsx                  # Sign up page
├── components/                       # Reusable UI components
│   ├── Navbar.tsx                    # Sticky navigation header
│   ├── Footer.tsx                    # Site footer with links
│   ├── ProductCard.tsx               # Product grid card
│   ├── ProductCardSkeleton.tsx       # Loading placeholder card
│   ├── CategoryFilter.tsx            # Category filter buttons
│   ├── RequireAuth.tsx               # Authentication guard wrapper
│   └── Toast.tsx                     # Success notification toast
├── context/                          # React Context providers
│   ├── AuthContext.tsx               # Authentication state & methods
│   └── AppContext.tsx                # Cart & order state & methods
├── lib/                              # Utilities & data
│   ├── products.ts                   # Static product catalog (13 items)
│   └── types.ts                      # TypeScript type definitions
├── public/                           # Static assets
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS configuration
├── .eslintrc.json                    # ESLint configuration
└── package.json                      # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd e-commerce

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit files.

---

## How to Run Locally

A step-by-step guide to get ShopClone running on your machine.

### 1. Prerequisites

Make sure you have the following installed:

- **Git** -- [Download & Install Git](https://git-scm.com/)
- **Node.js** 18.x or later -- [Download & Install Node.js](https://nodejs.org/)
  - npm is included with Node.js. You can also use **yarn**, **pnpm**, or **bun** as your package manager.

Verify your installations:

```bash
git --version
node --version   # Should output v18.x.x or higher
npm --version
```

### 2. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce
```

### 3. Install Dependencies

```bash
npm install
```

Or with an alternative package manager:

```bash
yarn install    # using yarn
pnpm install    # using pnpm
bun install     # using bun
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000). Open this URL in your browser.

> **Tip:** Next.js supports hot reloading -- any changes you make to the source files will automatically reflect in the browser without a manual refresh.

### 5. Build for Production (Optional)

To create an optimized production build and run it locally:

```bash
npm run build
npm run start
```

This starts the production server on [http://localhost:3000](http://localhost:3000).

### 6. Lint the Code (Optional)

```bash
npm run lint
```

### Troubleshooting

| Issue | Solution |
| ----- | -------- |
| `node: command not found` | Install Node.js from [nodejs.org](https://nodejs.org/) and ensure it's in your PATH |
| `npm install` fails with permission errors | Try `sudo npm install` (macOS/Linux) or run your terminal as Administrator (Windows) |
| Port 3000 is already in use | Stop the other process using port 3000, or start the dev server on a different port: `npm run dev -- -p 3001` |
| Images not loading | The app uses `picsum.photos` for placeholder images -- ensure you have an active internet connection |

---

## Pages & Routes

| Route                | Page                  | Description                                      | Auth Required |
| -------------------- | --------------------- | ------------------------------------------------ | ------------- |
| `/`                  | Home                  | Product listing with category filter              | No            |
| `/product/[id]`      | Product Detail        | Full product info with add-to-cart                | No            |
| `/cart`              | Cart                  | View and manage cart items                        | Yes           |
| `/checkout`          | Checkout              | Shipping, payment, and order summary              | Yes           |
| `/checkout/success`  | Order Confirmation    | Success message after placing an order            | Yes           |
| `/orders`            | Order History         | View all past orders with status and details      | Yes           |
| `/signin`            | Sign In               | Login with email and password                     | No            |
| `/signup`            | Sign Up               | Register a new account                            | No            |

---

## Components

### Navbar
Sticky top navigation bar displaying the ShopClone logo, search bar, user greeting (when authenticated), links to orders/sign-in/sign-up, sign-out button, and a cart icon with an item count badge.

### Footer
Site-wide footer with categorized links for Shop, Account, and Help sections along with copyright information.

### ProductCard
Displays a product in the grid with its image, title, price, and a quick "Add to Cart" button.

### ProductCardSkeleton
Animated placeholder card shown while products are loading.

### CategoryFilter
Row of filter buttons for product categories (All, Electronics, Clothing, Home, Books).

### RequireAuth
Wrapper component that redirects unauthenticated users to the sign-in page. Used to protect cart, checkout, and orders pages.

### Toast
Auto-dismissing notification that appears for 2.5 seconds to confirm user actions (e.g., "Item added to cart").

---

## State Management

The application uses **React Context API** with two providers:

### AuthContext (`context/AuthContext.tsx`)

Manages user authentication state and provides:

| Method/Property | Description                                       |
| --------------- | ------------------------------------------------- |
| `user`          | Currently signed-in user (or `null`)              |
| `signUp()`      | Register a new user with validation               |
| `signIn()`      | Authenticate with email and password              |
| `signOut()`     | Clear the current session                         |

**Validation rules:**
- All fields required
- Valid email format (regex check)
- Password minimum 6 characters
- Password and confirmation must match
- Duplicate emails rejected

**Storage keys:** `shopclone-users`, `shopclone-session`

### AppContext (`context/AppContext.tsx`)

Manages cart and order state and provides:

| Method/Property    | Description                                     |
| ------------------ | ----------------------------------------------- |
| `cart`             | Array of items in the current user's cart       |
| `orders`           | Array of the current user's past orders         |
| `cartTotal`        | Computed total price of all cart items           |
| `cartCount`        | Total number of items in cart                   |
| `addToCart()`      | Add a product with specified quantity            |
| `removeFromCart()`  | Remove a product from the cart                  |
| `updateQuantity()` | Change the quantity of a cart item              |
| `clearCart()`      | Empty the entire cart                           |
| `placeOrder()`     | Create a new order from current cart items      |

**Storage keys:** `shopclone-cart-{userId}`, `shopclone-orders-{userId}`

Both contexts are wrapped around the application in `app/layout.tsx`.

---

## Data Models

Defined in `lib/types.ts`:

```typescript
interface User {
  id: string;           // Format: USR-XXXXXX
  name: string;
  dob: string;
  email: string;
  password: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;        // picsum.photos URL
  category: string;     // Electronics | Clothing | Home | Books
}

interface CartItem {
  product: Product;
  quantity: number;      // Range: 1-10
}

interface Order {
  id: string;           // Format: ORD-XXXXXX
  items: CartItem[];
  total: number;
  date: string;         // ISO 8601 timestamp
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
```

---

## Product Catalog

The application ships with 13 hardcoded products in `lib/products.ts`:

| Category     | Products                                               |
| ------------ | ------------------------------------------------------ |
| Electronics  | Wireless Headphones, 4K Monitor, Mechanical Keyboard, Bluetooth Speaker |
| Clothing     | Denim Jacket, Cozy Sweater, Running Shoes              |
| Home         | Coffee Set, Desk Organizer, Scented Candles            |
| Books        | Design Patterns, Scrum, Atomic Habits                  |

Product images are sourced from `picsum.photos` using seed-based URLs for consistent placeholder images.

---

## Authentication

Authentication is handled entirely on the client side using localStorage:

1. **Sign Up** -- Creates a new user with a unique `USR-XXXXXX` ID, validates all fields, and stores the user in the `shopclone-users` array
2. **Sign In** -- Looks up the user by email, verifies the password, and stores the session in `shopclone-session`
3. **Session Persistence** -- The session survives page reloads by reading from localStorage on mount
4. **Protected Routes** -- The `RequireAuth` component wraps pages that require authentication and redirects to `/signin` if no session exists
5. **Sign Out** -- Clears the session from localStorage and navigates to the home page

> **Note:** This is a demo authentication system. Passwords are stored in plain text in localStorage. Do not use this approach in production.

---

## Cart & Orders

### Cart Workflow
1. Browse products on the home page or navigate to a product detail page
2. Select quantity (1-10) and click "Add to Cart"
3. View cart at `/cart` -- adjust quantities or remove items
4. Proceed to checkout

### Order Workflow
1. From the cart, click "Proceed to Checkout"
2. Review shipping address, payment method, and order summary
3. Click "Place Order" to create the order
4. View confirmation at `/checkout/success`
5. All orders appear in `/orders` with status badges

### Buy Again
From the order history page, click "Buy Again" on any past order to add all its items back to your cart.

---

## Configuration

### Ourguide identity verification

This project supports identifying the currently signed-in user to the Ourguide chat widget using a short-lived JWT. Ourguide can then call protected API routes on behalf of that user by sending this token to our backend.

- **Env**: set `OURGUIDE_AUTH_SECRET` in `.env.local` (HS256 signing secret).
  - For compatibility, `OURGUIDE_VERIFICATION_SECRET` is also accepted as a fallback.

Example:

```bash
OURGUIDE_AUTH_SECRET="your-long-random-secret"
```

#### Token minting endpoint

- `GET /api/ourguide-token`
  - Requires a normal app auth token (`Authorization: Bearer <app_jwt>`)
  - Returns `{ token }` where `token` is a JWT with:
    - `user_id` (required)
    - `exp` (required, 1 hour)
    - `email`, `name` (optional)

#### Frontend identify/reset

This is wired in [context/AuthContext.tsx](context/AuthContext.tsx):

- After login (or when already logged in on page load), the app calls `window.ourguide('identify', { token, name })`.
- It refreshes the token every 50 minutes.
- On logout (or when auth is cleared), it calls `window.ourguide('resetUser')`.

#### Backend verification (Ourguide calling our API)

Protected routes that use `getAuthUser()` (for example: `PATCH /api/orders/:id` with `{ action: 'cancel' }`) accept either:

- `Authorization: Bearer <app_jwt>` (normal user requests), or
- `Authorization: Bearer <ourguide_token>` (Ourguide automation), or
- `X-Ourguide-Token: <ourguide_token>` (alternate header)


### Next.js (`next.config.mjs`)
- Configured to allow remote images from `picsum.photos`

### Tailwind CSS (`tailwind.config.ts`)
- Content paths: `app/`, `components/`, `context/`, `lib/`
- Default Tailwind theme (no custom extensions)

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path alias: `@/*` maps to the project root
- Bundler module resolution

### ESLint (`.eslintrc.json`)
- Extends `next/core-web-vitals` and `next/typescript`

---

## Scripts

| Script          | Command           | Description                       |
| --------------- | ----------------- | --------------------------------- |
| `dev`           | `npm run dev`     | Start the development server      |
| `build`         | `npm run build`   | Build for production              |
| `start`         | `npm run start`   | Start the production server       |
| `lint`          | `npm run lint`    | Run ESLint checks                 |

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import the project on Vercel
3. Deploy -- no environment variables or special configuration needed

### Other Platforms

Since this is a standard Next.js application, it can be deployed to any platform that supports Node.js:
- **Self-hosted** -- Run `npm run build` followed by `npm run start`
- **Docker** -- Use an official Node.js image and run the build/start commands
- **Static Export** -- Possible with Next.js static export configuration if server features aren't needed

---

## Limitations & Future Improvements

This is a demo/prototype application. The following limitations exist and represent opportunities for future development:

### Current Limitations
- **No backend server** -- All data is stored in localStorage and is browser-specific
- **No real authentication** -- Passwords stored in plain text, no encryption or hashing
- **No real payment processing** -- Checkout uses static demo data
- **Search is non-functional** -- The search bar in the navbar is a UI placeholder
- **No persistent database** -- Data is lost if browser storage is cleared

### Potential Improvements
- Backend API with a database (e.g., Node.js/Express + PostgreSQL or MongoDB)
- Secure authentication with password hashing (bcrypt) and JWT/session tokens
- Payment gateway integration (Stripe, PayPal)
- Full-text product search and sorting/filtering by price, rating, etc.
- Product reviews and ratings
- Wishlist functionality
- User profile management and address book
- Admin dashboard for product and order management
- Email notifications for order updates
- Responsive image optimization with a proper CDN
- Unit and integration testing (Jest, React Testing Library)
- CI/CD pipeline

---

## Dependencies

### Production
| Package    | Version  |
| ---------- | -------- |
| next       | 14.2.35  |
| react      | ^18      |
| react-dom  | ^18      |

### Development
| Package              | Version  |
| -------------------- | -------- |
| typescript           | ^5       |
| tailwindcss          | ^3.4.1   |
| postcss              | ^8       |
| eslint               | ^8       |
| eslint-config-next   | 14.2.35  |
| @types/node          | ^20      |
| @types/react         | ^18      |
| @types/react-dom     | ^18      |
