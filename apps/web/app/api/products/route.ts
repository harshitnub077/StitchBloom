import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/auth";
import { Prisma } from "@crochetverse/database";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Extraction pagination params
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;

        // Extract filters
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const sort = searchParams.get("sort") || "newest";

        // Build Prisma query
        const where: Prisma.ProductWhereInput = {
            isActive: true,
            AND: [
                search
                    ? {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { description: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                category
                    ? {
                        category: {
                            slug: category,
                        },
                    }
                    : {},
                minPrice || maxPrice
                    ? {
                        price: {
                            gte: minPrice ? parseFloat(minPrice) : undefined,
                            lte: maxPrice ? parseFloat(maxPrice) : undefined,
                        },
                    }
                    : {},
            ],
        };

        // Determine sort order
        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
        switch (sort) {
            case "price-asc":
                orderBy = { price: "asc" };
                break;
            case "price-desc":
                orderBy = { price: "desc" };
                break;
            case "name-asc":
                orderBy = { name: "asc" };
                break;
            case "name-desc":
                orderBy = { name: "desc" };
                break;
            default:
                orderBy = { createdAt: "desc" };
        }

        // Execute queries
        const [products, total] = await Promise.all([
            db.product.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include: {
                    category: true,
                },
            }),
            db.product.count({ where }),
        ]);

        // Calculate metadata
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        });
    } catch (error) {
        console.error("[PRODUCTS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
