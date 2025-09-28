"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/Sidebar";

type Crop = {
  id: string;
  crop: string;
  quantity: string;
  price: string;
  date: string;
  time: string;
  transporterPicked: boolean;
  retailerPicked: boolean;
  paid: boolean;
  buyer?: string;
  walletId?: string;
};

export default function ConsumerDashboard() {
  const [myCrops, setMyCrops] = useState<Crop[]>([]);

  // Load crops from localStorage and filter by retailerPicked
  useEffect(() => {
    const storedCrops = localStorage.getItem("crops");
    if (storedCrops) {
      const crops: Crop[] = JSON.parse(storedCrops);
      setMyCrops(crops.filter((c) => c.retailerPicked));
    }
  }, []);

  // Toggle Paid status and add buyer info
  const handlePay = (id: string) => {
    const updatedCrops = myCrops.map((c) =>
      c.id === id
        ? {
            ...c,
            paid: true,
            buyer: "Consumer_001", // You can replace with dynamic user
            walletId: `0x${Math.random().toString(16).substr(2, 16)}`,
          }
        : c
    );
    setMyCrops(updatedCrops);

    // Update full crops in localStorage
    const allCrops: Crop[] = JSON.parse(localStorage.getItem("crops") || "[]");
    const updatedAllCrops = allCrops.map((c) =>
      c.id === id
        ? {
            ...c,
            paid: true,
            buyer: "Consumer_001",
            walletId: `0x${Math.random().toString(16).substr(2, 16)}`,
          }
        : c
    );
    localStorage.setItem("crops", JSON.stringify(updatedAllCrops));

    console.log("💰 Updated Crops:", updatedAllCrops);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">🛒 Consumer Dashboard</h1>

        {myCrops.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-6xl mb-4">🌾</div>
            <p>No crops available for purchase yet.</p>
            <p className="text-gray-400">Waiting for retailer to pick crops...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myCrops.map((c, i) => (
              <Card
                key={c.id || i}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <CardHeader className="bg-gradient-to-r from-blue-200 to-sky-300 text-gray-900">
                  <CardTitle className="flex items-center gap-2">
                    🌱 {c.crop}
                    <span className="text-blue-800 text-sm bg-blue-100 px-2 py-1 rounded-full ml-2">
                      Tx #{String(i + 1).padStart(4, "0")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p>
                    Quantity: {c.quantity}kg | Price: ₹{c.price}/kg
                  </p>
                  <p className="text-sm text-gray-500">
                    Listed on {c.date} at {c.time}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="font-medium">Payment Status:</span>{" "}
                      {c.paid ? "✅ Paid" : "❌ Not Paid"}
                    </div>
                    {!c.paid && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePay(c.id)}
                        className="ml-auto border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-300"
                      >
                        Pay
                      </Button>
                    )}
                  </div>

                  <div className="mt-2 text-sm text-gray-600 flex gap-4">
                    <span>
                      Transporter: {c.transporterPicked ? "✅ Picked" : "❌ Not Picked"}
                    </span>
                    <span>
                      Retailer: {c.retailerPicked ? "✅ Picked" : "❌ Not Picked"}
                    </span>
                    {c.paid && (
                      <span>
                        Buyer: {c.buyer} | Wallet: {c.walletId}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
