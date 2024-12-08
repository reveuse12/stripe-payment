import { NextResponse } from "next/server";
import { stripeToken } from "@/lib/stripe";

export async function GET() {
  try {
    // Fetching the prices from Stripe
    const prices = await stripeToken.prices.list({
      expand: ["data.product"],
    });

    // Formatting the prices and product information
    const formattedPrices = prices.data.map((price) => ({
      id: price.id,
      currency: price.currency,
      unit_amount: price.unit_amount,
      interval: price.recurring?.interval,
      product: {
        id: price.product.id,
        name: price.product.name,
        description: price.product.description,
      },
    }));

    // Returning the formatted prices
    return NextResponse.json({ plans: formattedPrices });
  } catch (error: unknown) {
    // Improved error handling
    if (error instanceof Error) {
      console.error("Error fetching plans:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
