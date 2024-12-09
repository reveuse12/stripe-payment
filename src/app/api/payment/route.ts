import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(request: NextRequest) {
  try {
    const { priceId, email, address } = await request.json();
    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      // customer_details: [],
      line_items: [
        {
          price: priceId, // Price ID from your Stripe product
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}success`,
      cancel_url: `${process.env.BASE_URL}cancel`,
    });

    return NextResponse.json({
      sessionId: session.id,
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
