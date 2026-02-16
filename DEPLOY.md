# CrochetVerse Deployment Guide

## 1. Environment Variables
Ensure all variables in \`.env.example\` are set in your production environment (e.g., Vercel Project Settings).

## 2. Infrastructure
### Database (Neon/Supabase)
1.  Create a new PostgreSQL project.
2.  Get the Connection String.
3.  Set \`DATABASE_URL\` in your environment.
4.  Run Migrations during build or manually:
    \`\`\`bash
    npx prisma migrate deploy
    \`\`\`

### Caching (Upstash/Redis) - Optional
If using Redis for rate limiting or caching:
1.  Create a Redis database.
2.  Set \`KV_URL\` or Redis connection string.

## 3. Frontend (Vercel)
1.  Import the GitHub repository.
2.  Framework Preset: **Next.js**.
3.  Root Directory: \`apps/web\` (since this is a monorepo).
4.  **Build Command**: \`cd ../.. && pnpm build\` (or rely on Turbo default: \`turbo run build\`).
    *   *Note*: Vercel usually handles monorepos automatically if you select the root, but for \`apps/web\` specific deployment, ensure it can see the shared packages.
5.  Add Environment Variables.
6.  Deploy.

## 4. Webhook Configuration
To receive updates from payment providers and auth services, configure these endpoints:

-   **Stripe**: \`https://your-domain.com/api/webhooks/stripe\`
    -   Events: \`checkout.session.completed\`, \`payment_intent.succeeded\`, \`payment_intent.payment_failed\`
-   **Razorpay**: \`https://your-domain.com/api/webhooks/razorpay\`
    -   Events: \`order.paid\`, \`payment.captured\`
-   **Clerk**: \`https://your-domain.com/api/webhooks/clerk\`
    -   Events: \`user.created\`, \`user.updated\`, \`user.deleted\`

## 5. Local Development
1.  Start DB: \`docker-compose up -d\`
2.  Install: \`pnpm install\`
3.  Env: Copy \`.env.example\` to \`.env\`
4.  Run: \`pnpm dev\`
