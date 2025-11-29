
import { StockDashboard } from "@/components/stock-table/stock-dashboard"
import { StockProvider } from "@/lib/stock-provider"

export default function Home() {
  return (
    <StockProvider>
      <StockDashboard />
    </StockProvider>
  )
}
