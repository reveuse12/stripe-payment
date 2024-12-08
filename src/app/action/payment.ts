import axios from "axios";

export const fetchSubscriptionPlans = async () => {
  try {
    const res = await axios.get("/api/payment/plans");
    return res.data.plans;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
  }
};
