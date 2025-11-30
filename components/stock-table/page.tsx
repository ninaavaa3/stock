"use client";

import { useCallback, useMemo} from "react";
import {
  type ColDef,
  type GetRowIdParams,
  type ValueFormatterParams,
  AllCommunityModule,
  ModuleRegistry,
} from "ag-grid-community";
import type { IStockData, IStockTableProps } from "@/lib/stock-api";
import { Loader2, Activity } from "lucide-react";
import "./style.css";
import { formatVolume } from "../utils/calculate";

import CustomTable from "../share/table";
import dynamic from "next/dynamic";
const Dashboard=dynamic(()=>import( "./cards"),{ssr:false})

ModuleRegistry.registerModules([AllCommunityModule]);

export function DynamicStockTable({ data, isLoading }: IStockTableProps) {
  const getRowId = useCallback(
    (params: GetRowIdParams<IStockData>) => params.data.number.toString(),
    []
  );
 
  const SpreadCellRenderer = useCallback((props: any) => {
    const buyPrice = props.data.pMeDem || 0;
    const sellPrice = props.data.pMeOf || 0;
    const spread = Math.abs(buyPrice - sellPrice);
    const spreadPercent = ((spread / buyPrice) * 100).toFixed(2);

    return (
      <div className="flex flex-col  justify-between ">
        <span
          className={`text-[12px] h-3 font-bold mb-1 ${
            Number(spreadPercent) < 0.5 ? "text-green-600" : "text-red-600"
          } `}
        >
          {spread.toLocaleString()}
        </span>
        <span
          className={`text-[10px]  ${
            Number(spreadPercent) < 0.5 ? "text-green-600" : "text-red-600"
          } `}
        >
          {spreadPercent}%
        </span>
      </div>
    );
  }, []);

  const VolumeCellRenderer = useCallback(
    (props: any) => {
      const value = props.value || 0;
      const maxVolume = Math.max(
        ...data.map((d) => Math.max(d.qTitMeDem || 0, d.qTitMeOf || 0))
      );
      const percentage = (value / maxVolume) * 100;
      const isBuy = props.colDef.field === "qTitMeDem";

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`absolute left-0 h-full ${
              isBuy ? "bg-green-100" : "bg-red-100"
            } opacity-40`}
            style={{ width: `${percentage}%` }}
          />
          <span className="relative z-10 font-bold text-gray-700 text-xs">
            {formatVolume(value)}
          </span>
        </div>
      );
    },
    [data]
  );
  const columnDefs = useMemo<ColDef<IStockData>[]>(
    () => [
      {
        field: "zOrdMeOf",
        headerName: "تعداد",
        headerClass: "colored-header header-sell",
        cellClass: "font-mono text-sm",
        cellRenderer: (params: any) => {
          const value = params.value || 0;
          return (
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-red-400" />
              <span className="font-bold text-sm">
                {value.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        field: "qTitMeOf",
        headerName: "حجم",
        headerClass: "colored-header header-sell",
        cellClass: "font-mono text-sm",
        cellRenderer: VolumeCellRenderer,
      },
      {
        field: "pMeOf",
        headerName: "قیمت فروش",
        headerClass: "colored-header header-sell",
        cellClass: "font-mono text-sm font-bold text-red-600",
        valueFormatter: (params: ValueFormatterParams) =>
          params.value?.toLocaleString() ?? "0",
      },
      {
        headerName: "تفاوت قیمت",
        headerClass: "colored-header header-spread",
        cellRenderer: SpreadCellRenderer,
        sortable: false,
        width: 90,
        flex: 0.7,
      },
      {
        field: "pMeDem",
        headerName: "قیمت خرید",
        headerClass: "colored-header header-buy",
        cellClass: "font-mono text-sm font-bold text-green-600",
        valueFormatter: (params: ValueFormatterParams) =>
          params.value?.toLocaleString() ?? "0",
      },
      {
        field: "qTitMeDem",
        headerName: "حجم",
        headerClass: "colored-header header-buy",
        cellClass: "font-mono text-sm",
        cellRenderer: VolumeCellRenderer,
      },
      {
        field: "zOrdMeDem",
        headerName: "تعداد",
        headerClass: "colored-header header-buy",
        cellClass: "font-mono text-sm",
        cellRenderer: (params: any) => {
          const value = params.value || 0;
          return (
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 font-bold text-green-400" />
              <span className="font-bold text-sm">
                {value.toLocaleString()}
              </span>
            </div>
          );
        },
      },
    ],
    [data]
  );

  return (
    <div className="flex flex-col gap-4">
      <Dashboard data={data} isLoading={false} />
      <div className="h-[240px]  shadow-lg rounded-2xl border-0 border-[#F0F0F0] w-full overflow-hidden    bg-white">
        <CustomTable rowData={data} getRowId={getRowId} columnDefs={columnDefs}/>
      </div>
    </div>
  );
}
