import { ColDef, GetRowIdFunc, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

export default function CustomTable({
  columnDefs,
  getRowId,
  rowData,
}: {
  columnDefs: ColDef<any>[];
  getRowId: GetRowIdFunc<any, any>;
  rowData: any[];
}) {
  const gridRef = useRef<AgGridReact>(null);
  const customTheme = themeQuartz.withParams({
    backgroundColor: "#ffffff",
    foregroundColor: "#1f2937",
    borderColor: "#e5e7eb",
    headerBackgroundColor: "#f3f4f6",
    headerTextColor: "#ffffff",
    oddRowBackgroundColor: "#F6F6F6",
    rowHoverColor: "#f0f9ff",
    cellHorizontalPadding: 8,
    borderRadius: 8,
    fontSize:"12px"
  });
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: false,
      resizable: false,
      suppressMovable: true,
      enableCellChangeFlash: true,
      flex: 1,
      minWidth: 80,
      
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border:"none",
        fontSize:"12px"
      },
    }),
    []
  );

  return (
    <AgGridReact
      ref={gridRef}
      theme={customTheme}
      defaultColDef={defaultColDef}
      rowData={rowData}
      columnDefs={columnDefs}
      getRowId={getRowId}
      animateRows={true}
      rowHeight={38}
      headerHeight={35}
      suppressCellFocus={true}
      enableCellTextSelection={true}
      suppressHorizontalScroll={false}
    />
  );
}
