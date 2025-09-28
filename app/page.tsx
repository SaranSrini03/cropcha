"use client"; 

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    setError(null);

    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected account:", accounts[0]);
        router.push("/roles");
      } catch (error) {
        console.error("User rejected or error occurred:", error);
        setError("Failed to connect to MetaMask. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError("MetaMask not detected!");
      setIsConnecting(false);
      
      // Optional: Auto-open MetaMask download page after a delay
      setTimeout(() => {
        if (confirm("MetaMask not found! Would you like to install it?")) {
          window.open("https://metamask.io/download.html", "_blank");
        }
      }, 500);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br  from-gray-900 via-gray-800 to-green-900">
      <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20">
        <main className="flex flex-col gap-12 items-center text-center max-w-4xl">
          {/* Logo/Header Section */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent tracking-tight">
              Cropcha
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Decentralized agricultural ecosystem connecting farmers, suppliers, and consumers through blockchain technology
            </p>
          </div>


          {/* Connection Section */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={connectMetaMask}
              disabled={isConnecting}
              className="group relative rounded-2xl bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-600 hover:to-amber-600 
                         disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                         transition-all duration-300 font-semibold text-white text-lg h-14 px-8 flex items-center justify-center 
                         shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[200px]"
            >
              {isConnecting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12v-2h-2v2h2zm-4 0v-2h-2v2h2zm-4-2h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm18-4h-20v14h20v-14zm-2 12h-16v-10h16v10z"/>
                  </svg>
                  Connect MetaMask
                </div>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 max-w-md">
                <p className="text-red-700 dark:text-red-300 flex items-center gap-2 justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Help Text */}
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </main>


      </div>
    </div>
  );
}