import { notFound } from "next/navigation";
import { Metadata } from "next";
import { db } from "@/lib/auth";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { ProductReviews } from "@/components/shop/ProductReviews";

interface ProductPageProps {
    params: { slug: string };
}

async function getProduct(slug: string) {
    const product = await db.product.findUnique({
        where: { slug },
        include: {
            category: true,
            reviews: {
                include: {
                    user: {
                        select: { name: true, image: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!product) return null;
    return product;
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(params.slug);

    if (!product) {
        return { title: "Product Not Found" };
    }

    return {
        title: `${product.name} | CrochetVerse`,
        description: product.description.substring(0, 160),
        openGraph: {
            images: product.images as string[],
        }
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <ProductGallery images={product.images as string[]} name={product.name} />
                <ProductInfo product={product} />
            </div>

            <div className="border-t pt-16">
                <ProductReviews productId={product.id} reviews={product.reviews} />
            </div>
        </div>
    );
}
