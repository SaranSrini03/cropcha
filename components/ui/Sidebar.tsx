"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "./card";
import { useState, useEffect, JSX } from "react";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type SidebarItem = {
  label: string;
  href: string;
  icon?: JSX.Element;
  badge?: string;
};

type SidebarProps = {
  items?: SidebarItem[];
};

export default function Sidebar({ items = defaultSidebarItems }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu when switching to desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking on a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const mobileSidebarClass = isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-green-600 rounded-lg text-white md:hidden transition-transform ${isOpen ? 'rotate-90' : ''
          }`}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40
        h-screen transition-all duration-300 ease-in-out
        ${isMobile ? `w-64 ${mobileSidebarClass}` : sidebarWidth}
        ${isMobile ? 'fixed top-0 left-0' : ''}
      `}>
        <Card className="h-full p-2 bg-gradient-to-b from-green-800 to-emerald-900 border-0 shadow-2xl rounded-none md:rounded-xl overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-green-600">
            <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <span
                      className="text-xl cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => router.push("/roles")}
                      title="Go to Roles"
                    >
                      🌾
                    </span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Cropcha</h2>
                    <p className="text-green-300 text-xs">Blockchain Verified</p>
                  </div>
                </div>
              )}

              {/* Collapse/Expand Button - Desktop only */}
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-1 hover:bg-green-700 rounded transition-colors"
                >
                  {isCollapsed ? <ChevronRight className="h-4 w-4 text-white" /> : <ChevronLeft className="h-4 w-4 text-white" />}
                </button>
              )}
            </div>

            {/* Farmer Profile - Hidden when collapsed */}
            {!isCollapsed && (
              <div className="flex items-center gap-3 mt-4 p-3 bg-green-900/30 rounded-lg border border-green-700">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-sm">👨‍🌾</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Farmer Account</p>
                  <p className="text-green-300 text-xs">Verified ✓</p>
                </div>
              </div>
            )}
          </div>

          <CardContent className="flex flex-col gap-1 p-3">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.includes(item.href.split('#')[0]);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
                    ${isActive
                      ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white transform scale-[1.02]'
                      : 'text-green-100 hover:bg-green-700/50 hover:text-white'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Active Indicator */}
                  {isActive && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-amber-400 rounded-r-full"></div>
                  )}

                  {/* Icon */}
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>

                  {/* Label - Hidden when collapsed */}
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1 truncate">{item.label}</span>

                      {/* Badge */}
                      {item.badge && (
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-bold transition-all duration-300
                          ${isActive
                            ? 'bg-amber-400 text-gray-900'
                            : 'bg-green-900/50 text-green-300 group-hover:bg-green-700'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}

                      {/* Hover Arrow */}
                      <span className={`opacity-0 transform translate-x-2 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'group-hover:opacity-100 group-hover:translate-x-0'
                        }`}>
                        →
                      </span>
                    </>
                  )}
                </Link>
              );
            })}

            {/* Blockchain Status Section - Hidden when collapsed */}
            {!isCollapsed && (
              <>
                <div className="mt-6 p-4 bg-green-900/30 rounded-xl border border-green-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm font-medium">Blockchain Status</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">Network:</span>
                      <span className="text-white">Online</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">Last Block:</span>
                      <span className="text-white font-mono">#8,742</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">Gas Fee:</span>
                      <span className="text-amber-300">0.002 ETH</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
                  <p className="text-green-400 text-xs font-medium mb-2">Quick Actions</p>
                  <div className="flex gap-2">
                    <button className="flex-1 p-2 bg-green-700 hover:bg-green-600 rounded text-xs text-white transition-colors">
                      🌱 Add Crop
                    </button>
                    <button className="flex-1 p-2 bg-amber-600 hover:bg-amber-500 rounded text-xs text-white transition-colors">
                      📊 Analytics
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-green-700">
                  <div className="flex items-center justify-between text-xs text-green-400">
                    <span>FarmChain v2.1</span>
                    <span className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      Secure
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main content margin adjustment */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isMobile ? 'w-full' : isCollapsed ? 'md:ml-16' : 'md:ml-64'}
        ${isMobile && isOpen ? 'ml-64' : ''}
      `}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}

// Updated default items with Lucide icons
export const defaultSidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/farmer",
    icon: <span className="text-lg">📊</span>,
    badge: "Home"
  },
  {
    label: "Add Crop",
    href: "/dashboard/farmer#add-crop",
    icon: <span className="text-lg">🌱</span>,
    badge: "New"
  },
  {
    label: "My Crops",
    href: "/dashboard/farmer#my-crops",
    icon: <span className="text-lg">🌾</span>,
    badge: "12"
  },
  {
    label: "Transporter",
    href: "/dashboard/transporter",
    icon: <span className="text-lg">🚚</span>,
    badge: "Track"
  },
  {
    label: "Retailer",
    href: "/dashboard/retailer",
    icon: <span className="text-lg">🏪</span>,
    badge: "Market"
  },
  {
    label: "Consumer",
    href: "/dashboard/consumer",
    icon: <span className="text-lg">👤</span>,
    badge: "End"
  },
];