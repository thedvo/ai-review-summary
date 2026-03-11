/**
 * Key features:
    - "use client" directive (needed for Date.now() and suppressHydrationWarning)
    - Avatar with fallback initials
    - Five-star rating display
    - Relative timestamp ("2 days ago")
    - Flexible layout with Flexbox

    Why suppressHydrationWarning? 
    --> Server-rendered timestamps differ from client-rendered ones (server time vs client time). 
    --> This prop tells React to expect mismatches on first render.

    Why is Review a Client Component?
    The timeAgo function uses Date.now(), which is a dynamic value that changes every millisecond. Next.js can't statically generate or cache this because it's time-dependent.
 * 
 */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Review as ReviewType } from "@/lib/types";
import ms from "ms";
import { FiveStarRating } from "./five-star-rating";

export function Review({ review }: { review: ReviewType }) {
  const date = new Date(review.date);
 
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>{getInitials(review.reviewer)}</AvatarFallback>
    </Avatar>
 
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{review.reviewer}</p>
            <div className="flex items-center gap-2 mt-1">
              <FiveStarRating rating={review.stars} />
              <time className="text-xs text-muted-foreground" suppressHydrationWarning>
                {timeAgo(date)}
              </time>
            </div>
          </div>
        </div>
 
        <p className="text-sm leading-relaxed text-muted-foreground">
          {review.review}
        </p>
      </div>
    </div>
  );
}
 
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
 
function timeAgo(date: Date, suffix = true): string {
  const now = Date.now();
  const diff = now - date.getTime();
 
  if (diff < 1000) {
    return "Just now";
  }
 
  return `${ms(diff, { long: true })}${suffix ? " ago" : ""}`;
}