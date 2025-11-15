"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    toast.success(`Payment method selected: ${paymentMethod}`);

    // Navigate to checkout
    window.location.href = "/checkout?step=4";
  };

  return (
    <Card className="w-full p-5 shadow-md rounded-xl border">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Select Payment Method</h2>

        {/* Radio Group */}
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="cursor-pointer text-md">
              Cash on Delivery
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="cursor-pointer text-md">
              Online Payment
            </Label>
          </div>
        </RadioGroup>

        {/* Checkout Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-5 text-md font-bold hover:bg-green-700"
        >
          Continue to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
