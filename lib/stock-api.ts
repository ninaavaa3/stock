const BASEURL="https://cdn.tsetmc.com"

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  volume: number;
  high: number;
  low: number;
}
export interface IStockTableProps {
  data: IStockData[];
  isLoading: boolean;
}
export interface IStockData {
  insCode?: any;//همه جا null میده
  number: number;//شبیه آیدی احتمالا
  pMeDem: number;//قیمت خرید
  pMeOf: number;//قیمت فروش
  qTitMeDem: number;//حجم خرید
  qTitMeOf: number;//حجم فروش
  title?: any;//همه جا null میده
  zOrdMeDem: number;//تعداد خرید
  zOrdMeOf: number;//تعداد فروش
}


export async function fetchData({id}:{id:string}):Promise<{bestLimits:IStockData[]}>{
const response =await fetch(`${BASEURL}/api/BestLimits/${id}`)
  const res= await response.json()
  return res;
}

