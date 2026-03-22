import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";
import { crops, monthLabels, nationalMetrics } from "@/lib/cropData";

const ease = [0.16, 1, 0.3, 1] as const;

// Aggregate national demand/supply over time
const nationalTrend = monthLabels.map((m, i) => ({
  month: m,
  demand: crops.reduce((s, c) => s + c.demandHistory[i], 0),
  supply: crops.reduce((s, c) => s + c.supplyHistory[i], 0),
}));

// Gap analysis
const gapData = crops
  .map((c) => ({
    name: c.name,
    gap: c.projectedDemand - c.projectedSupply,
    level: c.level,
  }))
  .sort((a, b) => b.gap - a.gap);

// Price volatility
const priceChange = crops.map((c) => ({
  name: c.name,
  change: ((c.priceHistory[5] - c.priceHistory[0]) / c.priceHistory[0] * 100),
  level: c.level,
})).sort((a, b) => b.change - a.change);

export default function Forecasts() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
          Forecasts
        </h1>
        <p className="text-muted-foreground mt-1">
          Predictive analytics and trend analysis for Botswana's agricultural market
        </p>
      </motion.div>

      {/* Forecast accuracy badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="rounded-xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h3 className="font-semibold text-foreground">Model Performance</h3>
          <p className="text-sm text-muted-foreground">
            Time-series forecasting using ARIMA + seasonal decomposition on FAOSTAT data
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-2xl font-bold text-secondary">{nationalMetrics.forecastAccuracy}%</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</p>
          </div>
        </div>
      </motion.div>

      {/* National trend */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-semibold text-foreground mb-1">National Demand vs Supply Trend</h3>
        <p className="text-xs text-muted-foreground mb-5">Aggregate across all tracked crops (tonnes)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={nationalTrend}>
              <defs>
                <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(32 80% 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(32 80% 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160 45% 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160 45% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 18% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(40 30% 99%)", border: "1px solid hsl(40 18% 88%)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)}k t`, undefined]} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Area type="monotone" dataKey="demand" name="Demand" stroke="hsl(32 80% 50%)" strokeWidth={2} fill="url(#demandGrad)" />
              <Area type="monotone" dataKey="supply" name="Supply" stroke="hsl(160 45% 40%)" strokeWidth={2} fill="url(#supplyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Gap analysis + Price volatility side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-semibold text-foreground mb-1">Demand–Supply Gap</h3>
          <p className="text-xs text-muted-foreground mb-4">Positive = undersupplied, Negative = oversupplied (tonnes)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gapData} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 18% 88%)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(40 30% 99%)", border: "1px solid hsl(40 18% 88%)", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => [`${value.toLocaleString()} t`, "Gap"]} />
                <Bar dataKey="gap" radius={[0, 4, 4, 0]} fill="hsl(32 80% 50%)"
                  // Color bars based on positive/negative
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-semibold text-foreground mb-1">Price Movement (6-month)</h3>
          <p className="text-xs text-muted-foreground mb-4">Percentage change in price per kilogram</p>
          <div className="space-y-3">
            {priceChange.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-sm text-foreground w-24 shrink-0">{item.name}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden relative">
                  {item.change >= 0 ? (
                    <div className="h-full rounded-full bg-agri-high" style={{ width: `${Math.min(Math.abs(item.change) * 2, 100)}%` }} />
                  ) : (
                    <div className="h-full rounded-full bg-agri-low absolute right-0" style={{ width: `${Math.min(Math.abs(item.change) * 2, 100)}%` }} />
                  )}
                </div>
                <span className={`font-mono text-xs w-14 text-right font-semibold ${
                  item.change >= 0 ? "text-agri-high" : "text-agri-low"
                }`}>
                  {item.change >= 0 ? "+" : ""}{item.change.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
