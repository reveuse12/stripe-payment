"use client";
import { useState } from "react";
import SubscriptionPlans from "@/components/subscription-plans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethod from "@/components/payment";

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div>
      <Tabs defaultValue="plans" className="">
        <TabsList>
          <TabsTrigger value="plans">Account</TabsTrigger>
          <TabsTrigger value="payment" disabled={!selectedPlan}>
            Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <SubscriptionPlans
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </TabsContent>
        <TabsContent value="payment">
          <PaymentMethod />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payment;
