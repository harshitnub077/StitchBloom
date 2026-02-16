import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: "admin@crochetverse.com" },
        update: {},
        create: {
            email: "admin@crochetverse.com",
            name: "Admin User",
            password: "hashed_password_123", // In real app, hash this!
            role: Role.ADMIN,
            clerkId: "user_admin_seed_123", // Dummy Clerk ID for seed
        },
    });

    console.log({ admin });

    // Create Categories
    const yarnCategory = await prisma.category.upsert({
        where: { slug: "yarn" },
        update: {},
        create: {
            name: "Yarn",
            slug: "yarn",
            description: "High quality yarn for all your projects",
        },
    });

    const hooksCategory = await prisma.category.upsert({
        where: { slug: "hooks" },
        update: {},
        create: {
            name: "Hooks",
            slug: "hooks",
            description: "Ergonomic crochet hooks",
        },
    });

    // Create Products
    const product1 = await prisma.product.upsert({
        where: { sku: "YARN-WOOL-001" },
        update: {},
        create: {
            name: "Premium Wool Yarn",
            slug: "premium-wool-yarn",
            description: "100% Merino Wool, soft and durable.",
            price: 12.99,
            costPerItem: 5.00,
            images: ["https://example.com/yarn-wool.jpg"],
            categoryId: yarnCategory.id,
            stock: 100,
            sku: "YARN-WOOL-001",
            tags: ["wool", "merino", "red"],
        },
    });

    const product2 = await prisma.product.upsert({
        where: { sku: "HOOK-SET-001" },
        update: {},
        create: {
            name: "Ergonomic Hook Set",
            slug: "ergonomic-hook-set",
            description: "Set of 5 ergonomic hooks sizes 2mm-6mm",
            price: 24.99,
            costPerItem: 10.00,
            images: ["https://example.com/hooks.jpg"],
            categoryId: hooksCategory.id,
            stock: 50,
            sku: "HOOK-SET-001",
            tags: ["hook", "set", "ergonomic"],
        },
    });

    console.log({ product1, product2 });

    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        // process.exit(1);
        throw e;
    });
