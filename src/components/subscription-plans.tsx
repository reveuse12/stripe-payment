"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionPlan } from "@/lib/type";
import { fetchSubscriptionPlans } from "@/app/action";

interface SubscriptionPlansProps {
  selectedPlan: string | null;
  setSelectedPlan: (planId: string | null) => void;
}

export default function SubscriptionPlans({
  selectedPlan,
  setSelectedPlan,
}: SubscriptionPlansProps) {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetchSubscriptionPlans();
      if (res) {
        setPlans(res);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Choose Your Subscription Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col ${
              selectedPlan === plan.id ? "border-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.product.name}</CardTitle>
              <CardDescription>{plan.product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: plan.currency,
                }).format(plan.unit_amount / 100)}{" "}
                <span className="text-sm font-normal">/{plan.interval}</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? "secondary" : "default"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
