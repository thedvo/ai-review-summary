/**
 * Use cases:
    New review submitted → invalidate that product's cache
    Product updated → invalidate cache
    Admin triggers refresh → invalidate cache
 * 
 */
"use server";
 
import { revalidateTag } from "next/cache";
 
export async function invalidateProductCache(productSlug: string) {
  revalidateTag(`product-summary-${productSlug}`, {});
  revalidateTag(`product-insights-${productSlug}`, {});
}