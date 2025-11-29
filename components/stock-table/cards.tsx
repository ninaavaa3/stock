"use client";

import { IStockTableProps } from "@/lib/stock-api";
import { useEffect, useState } from "react";
import { Loader2, TrendingUp, Activity, BarChart3, Zap } from "lucide-react";
import { formatVolume } from "../utils/calculate";
import DashboardCard from "../share/card";

const gradients = {
  // linear-gradient(135deg, #e99d9d 0%, #d76363 50%, #ce4b4b 100%)
  buy: "linear-gradient(135deg, #9de5cb 0%, #6ab49b 50%, #3ea484 100%)",
  sell: "linear-gradient(135deg, #e99d9d 0%, #d76363 50%, #ce4b4b 100%)",
  neutral: "linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%)",
  info: "linear-gradient(135deg, #91cedd 0%, #6ebdc7 50%, #4eacd5 100%)",
};

const pressureText = {
  BUY: "خرید",
  SELL: "فروش",
  NEUTRAL: "خنثی",
};

const pressureGradient = {
  BUY: gradients.buy,
  SELL: gradients.sell,
  NEUTRAL: gradients.neutral,
};

function StatusIndicator({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-green-300 animate-pulse" : "bg-gray-300"
        }`}
      />
      <span className="text-[10px] opacity-90">
        {isActive ? "فعال" : "متوقف"}
      </span>
    </div>
  );
}

export default function Dashboard({ data, isLoading }: IStockTableProps) {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);
  const [totalBuyVolume, setTotalBuyVolume] = useState(0);
  const [totalSellVolume, setTotalSellVolume] = useState(0);
  const [marketPressure, setMarketPressure] = useState<"BUY" | "SELL" | "NEUTRAL">("NEUTRAL");


  useEffect(() => {
    if (data && data.length > 0) {
      const buyVol = data.reduce((sum, item) => sum + (item.qTitMeDem || 0), 0);
      const sellVol = data.reduce((sum, item) => sum + (item.qTitMeOf || 0), 0);

      setTotalBuyVolume(buyVol);
      setTotalSellVolume(sellVol);

      const ratio = buyVol / (sellVol || 1);
      if (ratio > 1.2) setMarketPressure("BUY");
      else if (ratio < 0.8) setMarketPressure("SELL");
      else setMarketPressure("NEUTRAL");

      setLastUpdateTime(new Date());
    }
  }, [data]);

 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <DashboardCard
        title="حجم خرید کل"
        value={formatVolume(totalBuyVolume)}
        icon={<TrendingUp className="w-10 h-10 opacity-80" />}
        gradient={gradients.buy}
      />

      <DashboardCard
        title="حجم فروش کل"
        value={formatVolume(totalSellVolume)}
        icon={<BarChart3 className="w-10 h-10 opacity-80" />}
        gradient={gradients.sell}
      />

      <DashboardCard
        title="فشار بازار"
        value={pressureText[marketPressure]}
        icon={<Zap className="w-10 h-10 opacity-80" />}
        gradient={pressureGradient[marketPressure]}
      />

      <DashboardCard
        title="به‌روزرسانی زنده"
        value={lastUpdateTime.toLocaleTimeString("fa-IR")}
        icon={<Activity className="w-10 h-10 opacity-80" />}
        gradient={gradients.info}
        additionalContent={<StatusIndicator isActive={isLiveUpdating} />}
      />
    </div>
  );
}
