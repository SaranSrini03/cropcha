"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/Sidebar"; // Import your Sidebar component

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
};

export default function RetailerDashboard() {
  const [myCrops, setMyCrops] = useState<Crop[]>([]);

  // Load crops from localStorage
  useEffect(() => {
    const storedCrops = localStorage.getItem("crops");
    if (storedCrops) {
      const crops: Crop[] = JSON.parse(storedCrops);
      // Only show crops picked by transporter
      setMyCrops(crops.filter((c) => c.transporterPicked));
    }
  }, []);

  // Toggle retailer picked status
  const toggleRetailerPick = (id: string) => {
    const updatedCrops = myCrops.map((c) =>
      c.id === id ? { ...c, retailerPicked: !c.retailerPicked } : c
    );
    setMyCrops(updatedCrops);

    // Update localStorage for all crops
    const allCrops: Crop[] = JSON.parse(localStorage.getItem("crops") || "[]");
    const updatedAllCrops = allCrops.map((c) =>
      c.id === id ? { ...c, retailerPicked: !c.retailerPicked } : c
    );
    localStorage.setItem("crops", JSON.stringify(updatedAllCrops));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">🏪 Retailer Dashboard</h1>

        {myCrops.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-6xl mb-4">🌾</div>
            <p>No crops available for retail yet.</p>
            <p className="text-gray-400">Waiting for transporter to pick crops...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myCrops.map((c, i) => (
              <Card
                key={c.id || i}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all"
              >
                <CardHeader className="bg-gradient-to-r from-amber-200 to-orange-300 text-gray-900">
                  <CardTitle className="flex items-center gap-2">
                    🌱 {c.crop}
                    <span className="text-amber-800 text-sm bg-amber-100 px-2 py-1 rounded-full ml-2">
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
                      <span className="font-medium">Retailer Status:</span>{" "}
                      {c.retailerPicked ? "✅ Picked" : "❌ Not Picked"}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRetailerPick(c.id)}
                      className="ml-auto border-gray-300 text-gray-700 hover:bg-amber-100 hover:border-amber-300"
                    >
                      {c.retailerPicked ? "Unpick" : "Pick"}
                    </Button>
                  </div>

                  <div className="mt-2 text-sm text-gray-600 flex gap-4">
                    <span>
                      Transporter: {c.transporterPicked ? "✅ Picked" : "❌ Not Picked"}
                    </span>
                    <span>Paid: {c.paid ? "✅ Paid" : "❌ Pending"}</span>
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
