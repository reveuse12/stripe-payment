import Stripe from "stripe";

// Initialize Stripe with the secret key
export const stripeToken = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Specify your Stripe API version
});
