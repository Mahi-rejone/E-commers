"use client";
import { TruckIcon, XIcon, ZapIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Banner() {
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    setBannerVisible(sessionStorage.getItem("bannerVisible") !== "false");
  }, []);

  const handleCloseBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("bannerVisible", "false");
  };

  return (
    <div>
      {bannerVisible && (
        <div className="bg-linear-to-r from-app-green via-emerald-800 to-app-green text-white text-xs sm:text-sm relative overflow-hidden">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex-center gap-6">
            <div className="flex items-center gap-2">
              <TruckIcon className="size-4 shrink-0" />
              <span className="ml-3 font-medium">Free shipping on orders over $50</span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <ZapIcon className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">Free returns within 30 days</span>
            </div>
          </div>
          <button
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full -translate-y-1/2 transition-colors"
            onClick={handleCloseBanner}
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}