# CrochetVerse 🧶

A modern, full-stack e-commerce platform for handcrafted crochet items. Built with a focus on performance, scalability, and developer experience.

![CrochetVerse Banner](https://via.placeholder.com/1200x400?text=CrochetVerse)

## 🚀 Features

-   **Storefront**: Performance-optimized Next.js App Router frontend.
-   **Admin Dashboard**: Comprehensive order & product management.
-   **Payments**: Secure checkout with Stripe & Razorpay.
-   **Authentication**: User management via Clerk.
-   **Search**: Full-text search with autocomplete.
-   **Notifications**: Transactional emails via Resend.
-   **Infrastructure**: PostgreSQL (Neon), Prisma ORM, TurboRepo.

## 🛠 Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Monorepo**: TurboRepo
-   **Database**: PostgreSQL + Prisma
-   **Auth**: Clerk
-   **Styling**: Tailwind CSS + Shadcn UI
-   **State**: Zustand
-   **Payments**: Stripe / Razorpay
-   **Email**: Resend + React Email

## 🏃‍♂️ Getting Started

### Prerequisites

-   Node.js 18+
-   pnpm (`npm i -g pnpm`)
-   Docker (optional, for local DB)

### Installation

1.  Clone the repo:
    \`\`\`bash
    git clone https://github.com/yourusername/crochetverse.git
    cd crochetverse
    \`\`\`

2.  Install dependencies:
    \`\`\`bash
    pnpm install
    \`\`\`

3.  Environment Setup:
    -   See [SETUP.md](./SETUP.md) for detailed instructions.
    -   Copy \`apps/web/.env.example\` to \`apps/web/.env\`
    -   Fill in API keys for Clerk, Stripe, Database, etc.

4.  Database Setup:
    \`\`\`bash
    # Start local DB (optional)
    docker-compose up -d
    
    # Run migrations
    pnpm db:migrate
    
    # Seed data
    pnpm db:seed
    \`\`\`

5.  Run locally:
    \`\`\`bash
    pnpm dev
    \`\`\`
    Visit [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions on Vercel.

## 🧪 Testing

\`\`\`bash
pnpm test
\`\`\`

## 📄 License

MIT
