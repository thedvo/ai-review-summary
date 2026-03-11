import { generateText } from "ai";
import { Product } from "./types";

// Pass in a product object
export async function summarizeReviews(product: Product): Promise<string> {
  // Builds a prompt with product name and all reviews
  const prompt = `Summarize the following customer reviews for the ${product.name} product:
 
${product.reviews.map((review) => review.review).join("\n\n")}
 
Provide a concise summary of the main themes and sentiments in 2-3 sentences.`;
 
 // Calls Claude via AI Gateway
  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.5",
      prompt,
    });
    // returns the generated summary 
    return text;
  } catch (error) { // handles errors 
    console.error("Failed to generate summary:", error);
    throw new Error("Unable to generate review summary. Please try again.");
  }
}