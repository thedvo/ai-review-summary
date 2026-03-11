import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/sample-data";
import { Reviews } from "@/components/reviews";
import { StreamingSummary } from "@/components/streaming-summary";
import { ReviewInsights } from "@/components/review-insights";
 
export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
// await params to get route parameters
  const { productId } = await params; 
 
  let product;
// try/catch handles invalid product IDs
  try {
    product = getProduct(productId);
  } catch {
    notFound(); // renders 404 page
  }
 
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Product Header */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            {product.description}
          </p>
        </div>
        
        {/* Streaming Summary */}
        <StreamingSummary product={product} />
        {/* Review Insights */}
        <ReviewInsights product={product} />
        {/* Reviews */}
        <Reviews product={product} />
        
      </div>
    </main>
  );
}

// runs at build time
// Next.js generates HTML for each route
// Pages load instantly (no server rendering needed)
export function generateStaticParams() {
  const products = getProducts();
 
  // returns array of route parameters to pre-render
  return products.map((product) => ({
    productId: product.slug,
  }));
}

// generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
 
  let product;
  try {
    product = getProduct(productId);
  } catch {
    return {
      title: "Product Not Found",
    };
  }
 
  return {
    title: `${product.name} - Customer Reviews`,
    description: product.description,
  };
}