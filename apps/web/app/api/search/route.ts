import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                    // Assuming tags is a scalar list (String[]) in Prisma Schema
                    // { tags: { has: query } } 
                    // If tags is not yet array in prisma schema we stick to name/desc
                ],
                // status: "PUBLISHED" // If we have status field
            },
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                slug: true
            },
            take: 5,
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("[SEARCH_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
