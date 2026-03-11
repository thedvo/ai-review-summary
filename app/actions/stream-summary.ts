/** This Server Action wraps the streaming function and returns a response that can be consumed by the client. */

"use server";
 
import { streamReviewSummary } from "@/lib/ai-summary";
import { getProduct } from "@/lib/sample-data";
 
export async function getStreamingSummary(productSlug: string) {
  const product = getProduct(productSlug);
  const result = await streamReviewSummary(product);
  return result.toTextStreamResponse();
}