import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding StitchBloom products...");

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: "admin@stitchbloom.com" },
        update: {},
        create: {
            email: "admin@stitchbloom.com",
            name: "Admin User",
            password: "hashed_password_123", // In real app, hash this!
            role: "ADMIN",
            clerkId: "user_admin_seed_123", // Dummy Clerk ID for seed
        },
    });

    console.log({ admin });

    // Clean existing data to avoid conflicts for our new premium demo
    await prisma.cartItem.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // Create Categories
    const accessoriesCat = await prisma.category.create({
        data: {
            name: "Accessories",
            slug: "accessories",
            description: "Premium handcrafted accessories and key chains.",
        },
    });

    const decorCat = await prisma.category.create({
        data: {
            name: "Decor",
            slug: "decor",
            description: "Aesthetic handmade decor for your space or car.",
        },
    });

    const bagsCat = await prisma.category.create({
        data: {
            name: "Bags & Purses",
            slug: "bags-and-purses",
            description: "Elegant, durable, and stylish hand-crocheted bags.",
        },
    });

    // Create Products
    const products = [
        {
            name: "Rose (Without Leaf)",
            slug: "rose-without-leaf",
            description: "A beautifully handcrafted crochet rose, a symbol of eternal beauty. Designed with intricate stitches to mimic a real petal's softness.",
            price: 100,
            costPerItem: 30,
            images: "https://images.unsplash.com/photo-1550060931-1559868f70ba?q=80&w=1080&auto=format&fit=crop", // Replace with actual aesthetic rose
            categoryId: decorCat.id,
            stock: 9,
            sku: "ROSE-NL-001",
            tags: "rose, flower, gift, decor",
        },
        {
            name: "Rose (With Leaf)",
            slug: "rose-with-leaf",
            description: "An elegant crochet rose complete with a detailed green leaf. Perfect for gifting or aesthetic room decor.",
            price: 150,
            costPerItem: 50,
            images: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?q=80&w=1080&auto=format&fit=crop",
            categoryId: decorCat.id,
            stock: 15,
            sku: "ROSE-WL-002",
            tags: "rose, flower, leaf, decor",
        },
        {
            name: "Key Chain – Bear",
            slug: "key-chain-bear",
            description: "An adorable, miniature crocheted bear to accompany you everywhere. A premium touch to your keys or bag.",
            price: 60,
            costPerItem: 20,
            images: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=1080&auto=format&fit=crop", // bear image
            categoryId: accessoriesCat.id,
            stock: 10,
            sku: "KC-BEAR-001",
            tags: "keychain, bear, cute, accessory",
        },
        {
            name: "Key Chain – Metal Chain",
            slug: "key-chain-metal-chain",
            description: "A sleek and aesthetic metal chain accessory woven with premium yarn accents. Durable and stylish.",
            price: 60,
            costPerItem: 20,
            images: "https://images.unsplash.com/photo-1611078755012-70b92d6e492b?q=80&w=1080&auto=format&fit=crop",
            categoryId: accessoriesCat.id,
            stock: 31,
            sku: "KC-METAL-002",
            tags: "keychain, metal, minimalist, accessory",
        },
        {
            name: "Big Evil Eye (Car Hanger)",
            slug: "big-evil-eye-car-hanger",
            description: "Protect your energy with this premium, handcrafted Evil Eye hanger. The perfect aesthetic addition to your car interior.",
            price: 100,
            costPerItem: 35,
            images: "https://images.unsplash.com/photo-1515286202422-9df7be74a6cf?q=80&w=1080&auto=format&fit=crop", // eye motif
            categoryId: decorCat.id,
            stock: 17,
            sku: "DEC-EVILEYE-001",
            tags: "evil-eye, car-hanger, decor, protection",
        },
        {
            name: "Hair Band",
            slug: "hair-band",
            description: "A beautifully textured crochet hair band. Soft, comfortable, and designed to match any premium aesthetic.",
            price: 50,
            costPerItem: 15,
            images: "https://images.unsplash.com/photo-1550977186-c4582f219ce0?q=80&w=1080&auto=format&fit=crop",
            categoryId: accessoriesCat.id,
            stock: 15,
            sku: "ACC-HB-001",
            tags: "hairband, accessory, fashion, soft",
        },
        {
            name: "Small Purse",
            slug: "small-purse",
            description: "A chic, minimalist crochet purse. The perfect size for your essentials, featuring a neat, aesthetic weave.",
            price: 180,
            costPerItem: 60,
            images: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1080&auto=format&fit=crop",
            categoryId: bagsCat.id,
            stock: 15,
            sku: "BAG-SML-001",
            tags: "purse, small, bag, fashion",
        },
        {
            name: "Medium Size Purse",
            slug: "medium-size-purse",
            description: "An elegant medium-sized purse designed for everyday carry. Exquisite stitch patterns give it a high-end designer feel.",
            price: 250,
            costPerItem: 90,
            images: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1080&auto=format&fit=crop",
            categoryId: bagsCat.id,
            stock: 15,
            sku: "BAG-MED-002",
            tags: "purse, medium, bag, elegant",
        },
        {
            name: "Hand Bags",
            slug: "hand-bags",
            description: "Our statement piece. A deeply textured, capacious handbag crafted for maximum utility and stunning visual appeal.",
            price: 400,
            costPerItem: 150,
            images: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1080&auto=format&fit=crop",
            categoryId: bagsCat.id,
            stock: 15,
            sku: "BAG-HLD-003",
            tags: "handbag, large, premium, statement",
        },
        {
            name: "Blue Dreamcatcher",
            slug: "blue-dreamcatcher",
            description: "A beautifully handcrafted blue dreamcatcher with layered plumage and cowrie shell accents. Perfect for wall decor.",
            price: 299,
            costPerItem: 80,
            images: "/products/blue-dreamcatcher.jpg",
            categoryId: decorCat.id,
            stock: 5,
            sku: "DEC-BLUDC-001",
            tags: "dreamcatcher, blue, decor, feathers",
        },
        {
            name: "Daisy Square Bag",
            slug: "daisy-square-bag",
            description: "A delicate pale blue crochet shoulder bag featuring a beautiful puff-stitch daisy motif in the center.",
            price: 349,
            costPerItem: 100,
            images: "/products/blue-flower-bag.jpg",
            categoryId: bagsCat.id,
            stock: 8,
            sku: "BAG-DSY-001",
            tags: "bag, daisy, floral, shoulder-bag",
        },
        {
            name: "Chunky Heart Keychain",
            slug: "chunky-heart-keychain",
            description: "A vibrant red, plush amigurumi heart keychain. A charming accessory to spread love wherever you go.",
            price: 99,
            costPerItem: 25,
            images: "/products/red-heart-keychain.jpg",
            categoryId: accessoriesCat.id,
            stock: 20,
            sku: "KC-HEART-001",
            tags: "keychain, heart, red, accessory",
        },
        {
            name: "Festive Braided Handbag",
            slug: "festive-braided-handbag",
            description: "A stunning statement handbag with bold red, green, and white stripes, featuring a braided handle and a gold chain strap.",
            price: 599,
            costPerItem: 200,
            images: "/products/striped-bag.jpg",
            categoryId: bagsCat.id,
            stock: 3,
            sku: "BAG-FSTV-001",
            tags: "handbag, braided, festive, striped",
        },
        {
            name: "Sunflower Mini Tote",
            slug: "sunflower-mini-tote",
            description: "A lovely light green mini tote bag boasting a large, intricate sunflower motif. Great for carrying essentials in style.",
            price: 329,
            costPerItem: 90,
            images: "/products/green-sunflower-bag.jpg",
            categoryId: bagsCat.id,
            stock: 6,
            sku: "BAG-SUN-001",
            tags: "tote, sunflower, green, floral",
        }
    ];

    for (const prod of products) {
        await prisma.product.create({
            data: prod,
        });
    }

    console.log(`Successfully seeded ${products.length} products!`);
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
