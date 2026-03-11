/**
 * What this does:

    Creates 5 star icons
    Fills stars based on rating (1-5)
    Uses Tailwind for colors (yellow for filled, gray for empty)
 */
import { Star } from "lucide-react";
 
export function FiveStarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}