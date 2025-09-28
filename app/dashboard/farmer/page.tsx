"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/ui/Sidebar";
import {
    Sprout,
    Plane,
    Scale,
    IndianRupee,
    Link,
    FileStack,
    Shield,
    ChevronDown,
    Calendar,
    Award
} from 'lucide-react';

type Crop = {
    walletId: ReactNode;
    id: string;
    crop: string;
    quantity: string;
    price: string;
    date: string;
    time: string;
    transporterPicked: boolean;
    retailerPicked: boolean;
    buyer?: string;
    paid?: boolean;
};

const customItems = [
    { label: "Add Crop", href: "/dashboard/farmer#add-crop" },
    { label: "My Crops", href: "/dashboard/farmer#my-crops" },
];

export default function FarmerDashboard() {
    const [crop, setCrop] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [myCrops, setMyCrops] = useState<Crop[]>([]);

    // Load crops from localStorage on page load
    useEffect(() => {
        const storedCrops = localStorage.getItem("crops");
        if (storedCrops) {
            setMyCrops(JSON.parse(storedCrops));
            console.log("📦 Loaded crops from storage:", JSON.parse(storedCrops));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date();
        const newCrop: Crop = {
            id: crypto.randomUUID(),
            crop,
            quantity,
            price,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            transporterPicked: false,
            retailerPicked: false,
            buyer: "",
            paid: false,
            walletId: undefined
        };

        // Save to state
        const updatedCrops = [...myCrops, newCrop];
        setMyCrops(updatedCrops);

        // Save to localStorage (accessible to other dashboards)
        localStorage.setItem("crops", JSON.stringify(updatedCrops));

        console.log("🌱 New crop saved:", newCrop);
        console.log("📦 Updated crops in storage:", updatedCrops);

        // Reset form
        setCrop("");
        setQuantity("");
        setPrice("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-emerald-50 flex">
            {/* Sidebar with Farm Theme */}
            <div className="bg-gradient-to-b from-green-800 to-emerald-900 border-r border-green-700 ">

                <Sidebar items={customItems} />


            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header with Blockchain Badge */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <span className="text-2xl">👨‍🌾</span>
                            </div>
                            Farmer Dashboard
                            <span className="text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full ml-3">
                                Blockchain Secured
                            </span>
                        </h1>
                    </div>

                </div>

                {/* Add Crop Form with Blockchain Theme */}
                <Card className="mb-8 shadow-lg border-2 border-green-200 bg-white/80 backdrop-blur-sm" id="add-crop">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <Sprout className="h-6 w-6" />
                            Add New Crop to Blockchain
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Plane className="h-4 w-4 text-green-600" />
                                        Crop Name
                                    </label>
                                    <Input
                                        placeholder="e.g., Organic Wheat"
                                        value={crop}
                                        onChange={(e) => setCrop(e.target.value)}
                                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Scale className="h-4 w-4 text-blue-600" />
                                        Quantity (kg)
                                    </label>
                                    <Input
                                        placeholder="0"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <IndianRupee className="h-4 w-4 text-amber-600" />
                                        Price per kg (₹)
                                    </label>
                                    <Input
                                        placeholder="0"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all shadow-lg group"
                            >
                                <Link className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                                Add to Blockchain
                            </Button>

                            {/* Blockchain Transaction Info */}
                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2 text-sm text-green-800">
                                    <FileStack className="h-4 w-4 text-green-600" />
                                    This transaction will be permanently recorded on the blockchain
                                </div>
                            </div>

                            {/* Advanced Options */}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium text-gray-700">Advanced Options</span>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </div>

                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">Harvest Date</span>
                                        <Input type="date" className="ml-auto w-32" />
                                    </div>

                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                        <Award className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">Quality Grade</span>
                                        <select className="ml-auto w-32 text-sm border rounded p-1">
                                            <option>Premium</option>
                                            <option>Standard</option>
                                            <option>Organic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Crop List with Blockchain Verification */}
                <Card className="shadow-lg border-2 border-amber-200 bg-white/80 backdrop-blur-sm" id="my-crops">
                    <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-xl">📦</span>
                            My Blockchain Crops
                            <span className="text-amber-200 text-sm bg-amber-700/30 px-2 py-1 rounded-full ml-2">
                                {myCrops.length} Active Listings
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {myCrops.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">🌾</div>
                                <p className="text-gray-600 text-lg">No crops listed on blockchain yet.</p>
                                <p className="text-gray-500">Add your first crop to start trading!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myCrops.map((c, i) => (
                                    <div
                                        key={c.id || i}
                                        className="p-4 border-2 border-green-100 rounded-xl bg-gradient-to-r from-white to-green-50 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            {/* Crop Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <span className="text-xl">🌱</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900 capitalize">
                                                            {c.crop}
                                                        </h3>
                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                            <span>⚖️ {c.quantity}kg</span>
                                                            <span>💰 ₹{c.price}/kg</span>
                                                            <span className="text-green-600 font-mono text-xs bg-green-100 px-2 py-1 rounded">
                                                                #Tx{String(i + 1).padStart(4, '0')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    📅 Listed on {c.date} at {c.time}
                                                </p>
                                            </div>

                                            {/* Blockchain Status */}
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Status Indicators */}
                                                <div className="grid grid-cols-3 gap-2">


                                                    {/* Blockchain Status */}
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        {/* Status Indicators */}
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div className={`text-center p-2 rounded-lg ${c.transporterPicked ? 'bg-green-100 border border-green-300' : 'bg-gray-100'}`}>
                                                                <div className="text-lg">🚚</div>
                                                                <span className={`text-xs font-medium ${c.transporterPicked ? 'text-green-700' : 'text-gray-500'}`}>
                                                                    {c.transporterPicked ? "Picked" : "Pending"}
                                                                </span>
                                                            </div>

                                                            <div className={`text-center p-2 rounded-lg ${c.retailerPicked ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100'}`}>
                                                                <div className="text-lg">🏪</div>
                                                                <span className={`text-xs font-medium ${c.retailerPicked ? 'text-blue-700' : 'text-gray-500'}`}>
                                                                    {c.retailerPicked ? "Picked" : "Pending"}
                                                                </span>
                                                            </div>

                                                            <div className={`text-center p-2 rounded-lg ${c.paid ? 'bg-emerald-100 border border-emerald-300' : 'bg-gray-100'}`}>
                                                                <div className="text-lg">💳</div>
                                                                <span className={`text-xs font-medium ${c.paid ? 'text-emerald-700' : 'text-gray-500'}`}>
                                                                    {c.paid ? "Paid" : "Pending"}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Show buyer info if paid */}
                                                        {c.paid && c.buyer && c.walletId && (
                                                            <div className="flex flex-col justify-center p-2 bg-gray-50 rounded-lg border border-gray-200 ml-4">
                                                                <span className="text-xs text-gray-700">Buyer: {c.buyer}</span>
                                                                <span className="text-xs text-gray-700">Wallet: {c.walletId}</span>
                                                            </div>
                                                        )}

                                                        {/* Blockchain Verification */}
                                                        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                            <span className="text-xs text-gray-600">Verified</span>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>

                                        {/* Blockchain Transaction Hash (Simulated) */}
                                        <div className="mt-3 p-2 bg-gray-50 rounded border">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400 text-xs">🔗 Transaction:</span>
                                                <code className="text-xs font-mono text-gray-600">
                                                    0x{Math.random().toString(16).substr(2, 16)}...{Math.random().toString(16).substr(2, 16)}
                                                </code>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>



                {/* Blockchain Network Status */}

            </div>
        </div>
    );

}
