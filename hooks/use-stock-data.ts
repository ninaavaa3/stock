"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchData,  IStockData } from "@/lib/stock-api"

export function useStockData({id}:{id:string}) {
  return useQuery<{bestLimits:IStockData[]}>({
    queryKey: ["dynamicData"],
    queryFn:()=> fetchData({id}),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    placeholderData: (previousData) => previousData, 
  })
}
