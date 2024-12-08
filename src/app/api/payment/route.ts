import { stripeToken } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();
    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 }
      );
    }

    // Fetch the selected plan details
    const prices = await stripeToken.prices.list({ expand: ["data.product"] });
    const selectedPlan = prices.data.find((price) => price.id === planId);

    if (!selectedPlan) {
      return NextResponse.json({ error: "Invalid plan ID" }, { status: 404 });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripeToken.paymentIntents.create({
      amount: selectedPlan.unit_amount!,
      currency: selectedPlan.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret needed to complete the payment
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating payment intent:", error.message);
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
