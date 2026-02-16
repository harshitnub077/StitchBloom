import { ProductCard } from "./ProductCard";

interface ProductGridProps {
    products: any[]; // Replace 'any' with Product type from Prisma client or shared types
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-2xl font-bold">No products found</h3>
                <p className="text-muted-foreground">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
