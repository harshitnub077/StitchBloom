# CrochetVerse Setup Guide

This guide details how to set up the CrochetVerse E-commerce application locally.

## Prerequisites

- **Node.js**: v18 or later
- **pnpm**: v8 or later
- **PostgreSQL**: Local instance or hosted (e.g., Neon, Supabase)

## 1. Environment Configuration

### Web Application
Navigate to `apps/web` and create a `.env` file based on the example:

```bash
cd apps/web
cp .env.example .env
```

You must populate the following keys in `apps/web/.env`:

#### Authentication (Clerk)
- **Source**: [Clerk Dashboard](https://dashboard.clerk.com)
- **Variables**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

#### Database (PostgreSQL)
- **Variable**: `DATABASE_URL`
- **Format**: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`

#### Payments
- **Stripe**: [Stripe Dashboard](https://dashboard.stripe.com) -> Developers -> API keys
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Razorpay**: [Razorpay Dashboard](https://dashboard.razorpay.com) -> Settings -> API Keys
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`

#### Email (Resend)
- **Source**: [Resend API Keys](https://resend.com/api-keys)
- **Variable**: `RESEND_API_KEY`

## 2. Database Setup

Once your `DATABASE_URL` is set in `apps/web/.env` and `packages/database/.env` (if applicable), initialize the database:

```bash
# Generate Prisma Client
pnpm db:generate

# Push Schema to Database
pnpm db:push

# (Optional) Seed the database
pnpm db:seed
```

## 3. Running the Application

Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Troubleshooting

- **"Clerk is in keyless mode"**: You haven't set the Clerk keys in `.env`.
- **Database Connection Error**: Ensure your Postgres server is running and the `DATABASE_URL` is correct.
- **"React Lazy" Error**: This usually happens if Auth is enabled but keys are missing. Fix your `.env` file.
