export type SubscriptionPlan = {
  id: string;
  currency: string;
  unit_amount: number;
  interval: string;
  product: {
    id: string;
    name: string;
    description: string;
  };
};
