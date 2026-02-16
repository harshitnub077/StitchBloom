import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Review {
    id: string;
    rating: number;
    comment: string | null;
    user: { name: string | null; image: string | null };
    createdAt: Date;
}

interface ProductReviewsProps {
    productId: string;
    reviews: Review[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 0;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Math.round(averageRating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-muted-foreground">
                            Based on {reviews.length} reviews
                        </span>
                    </div>

                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = reviews.filter((r) => r.rating === rating).length;
                            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                            return (
                                <div key={rating} className="flex items-center gap-2 text-sm">
                                    <span className="w-3">{rating}</span>
                                    <Star className="h-3 w-3 text-muted-foreground" />
                                    <Progress value={percentage} className="h-2" />
                                    <span className="w-8 text-right text-muted-foreground">
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <Button className="w-full">Write a Review</Button>
                </div>

                <div className="space-y-6">
                    {reviews.length === 0 ? (
                        <p className="text-muted-foreground italic">No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="border-b pb-6 last:border-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={review.user.image || ""} />
                                        <AvatarFallback>{review.user.name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold">{review.user.name || "Anonymous"}</span>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
