import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { crops, monthLabels } from "@/lib/cropData";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = monthLabels.map((month, i) => {
  const point: Record<string, string | number> = { month };
  crops.forEach((c) => { point[c.name] = c.priceHistory[i]; });
  return point;
});

const colors = [
  "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--destructive))",
  "hsl(32 60% 65%)", "hsl(200 60% 50%)", "hsl(280 50% 55%)",
  "hsl(160 30% 55%)", "hsl(0 50% 65%)",
];

export default function PriceTrends() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Price Trends</h1>
        <p className="text-sm text-muted-foreground mt-1">Track price movements across all crops over the past 6 months.</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">All Crops – Price per kg (BWP)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Legend />
              {crops.map((c, i) => (
                <Line key={c.name} type="monotone" dataKey={c.name} stroke={colors[i % colors.length]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Price Summary Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Current Price Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 font-medium text-muted-foreground">Crop</th>
                  <th className="py-2 font-medium text-muted-foreground">Category</th>
                  <th className="py-2 font-medium text-muted-foreground text-right">Price/kg</th>
                  <th className="py-2 font-medium text-muted-foreground text-right">6m Change</th>
                  <th className="py-2 font-medium text-muted-foreground text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((c) => {
                  const change = ((c.priceHistory[5] - c.priceHistory[0]) / c.priceHistory[0] * 100).toFixed(1);
                  const isUp = Number(change) > 0;
                  return (
                    <tr key={c.name} className="border-b border-border/50">
                      <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                      <td className="py-2.5 text-muted-foreground">{c.category}</td>
                      <td className="py-2.5 text-right font-mono text-foreground">P{c.pricePerKg.toFixed(2)}</td>
                      <td className={`py-2.5 text-right font-mono ${isUp ? "text-secondary" : "text-destructive"}`}>
                        {isUp ? "+" : ""}{change}%
                      </td>
                      <td className="py-2.5 text-center">
                        {c.trend === "up" && <TrendingUp className="h-4 w-4 text-secondary inline" />}
                        {c.trend === "down" && <TrendingDown className="h-4 w-4 text-destructive inline" />}
                        {c.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground inline" />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
