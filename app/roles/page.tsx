"use client";

import { useRouter } from "next/navigation";

export default function RolesPage() {
    const router = useRouter();

    const handleRoleSelect = (role: string) => {
        router.push(`/dashboard/${role.toLowerCase()}`);
    };

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-gray-800 text-white p-4">
            {/* Animated Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-100">
                    Choose Your Role
                </h1>
                <p className="text-gray-300 text-lg">Select your position in the supply chain</p>
            </div>

            {/* Enhanced Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {[
                    { role: "farmer", color: "green", icon: "🌱", desc: "Grow and harvest produce" },
                    { role: "transporter", color: "blue", icon: "🚚", desc: "Transport goods safely" },
                    { role: "retailer", color: "amber", icon: "🏪", desc: "Sell products to consumers" },
                    { role: "consumer", color: "purple", icon: "👤", desc: "Purchase and use products" }
                ].map(({ role, color, icon, desc }) => (
                    <button
                        key={role}
                        onClick={() => handleRoleSelect(role)}
                        className={`
            relative overflow-hidden group p-6 rounded-2xl transition-all duration-300 
            transform hover:scale-105 hover:shadow-2xl active:scale-95
            bg-gradient-to-br from-${color}-600 to-${color}-800 
            hover:from-${color}-500 hover:to-${color}-700
            border-2 border-${color}-400/20 hover:border-${color}-300/40
          `}
                    >
                        {/* Animated Background Effect */}
                        <div className="absolute inset-0 bg-white/10 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                        <div className="relative z-10 flex items-center space-x-4">
                            {/* Icon Container */}
                            <div className={`text-3xl p-3 rounded-xl bg-${color}-500/20 backdrop-blur-sm`}>
                                {icon}
                            </div>

                            {/* Text Content */}
                            <div className="text-left">
                                <h2 className="text-xl font-semibold capitalize">{role}</h2>
                                <p className="text-sm text-gray-200/80 mt-1">{desc}</p>
                            </div>
                        </div>

                        {/* Animated Arrow */}
                        <div className={`absolute top-4 right-4 text-${color}-200 transform translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                            →
                        </div>
                    </button>
                ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center text-gray-400 text-sm">
                <p>You can change your role later in settings</p>
            </div>
        </div>
    );
}
