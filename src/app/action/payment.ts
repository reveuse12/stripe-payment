import axios from "axios";

export const fetchSubscriptionPlans = async () => {
  try {
    const res = await axios.get("/api/payment/plans");
    return res.data.plans;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
  }
};

export const createSubscription = async (priceId: string) => {
  try {
    const res = await axios.post(`/api/payment`, {
      priceId,
      name: "Prayag's Subscription",
      description: "Monthly subscription plan for Prayag",
      email: "prayag129787@gmail.com",
      address: "street 13, zuribag, porbandar, 3605475",
    });
    return res.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
  }
};
