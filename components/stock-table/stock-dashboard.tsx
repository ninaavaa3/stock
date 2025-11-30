"use client";




import { useStockData } from "@/hooks/use-stock-data";
import { DynamicStockTable } from "./page";
import { useParams } from "next/navigation";

export function StockDashboard() {


  const params = useParams<{id:string}>();
  
  const {
    data: dynamicData,
    isLoading: DynamicLoading,
  } = useStockData({id:params?.id});

  return (
    <main className="xl:p-1 grid xl:grid-cols-3 ">
      <div/>
      <div className="col-span-2">
      
        <DynamicStockTable
          data={dynamicData?.bestLimits ?? []}
          isLoading={DynamicLoading}
        />
      </div>
    </main>
  );
}



