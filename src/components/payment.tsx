import React from "react";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createSubscription } from "@/app/action";

interface PaymentMethodProps {
  selectedPlan: string | null;
}

// Load the Stripe instance
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISED_KEY!);

const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedPlan }) => {
  const handlePayment = async () => {
    if (!selectedPlan) {
      console.error("No plan selected");
      return;
    }

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe failed to initialize");
        return;
      }

      // Call the createSubscription function
      const res = await createSubscription(selectedPlan);

      if (res) {
        console.log("Create subscription", res);
        const { sessionId } = res;

        if (!sessionId) {
          throw new Error("Session ID is missing in the response");
        }

        // Redirect to the Checkout session
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error(
            "Stripe Checkout redirection error:",
            result.error.message
          );
        }
      } else {
        console.error("Failed to create subscription:", res);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <p>Selected Plan: {selectedPlan || "No plan selected"}</p>
      <Button onClick={handlePayment} disabled={!selectedPlan}>
        {selectedPlan ? "Pay Now!" : "Select a Plan First"}
      </Button>
    </div>
  );
};

export default PaymentMethod;
