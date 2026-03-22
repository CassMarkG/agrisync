import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Droplets, Calendar, Clock, Layers } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { crops, monthLabels } from "@/lib/cropData";

const ease = [0.16, 1, 0.3, 1] as const;

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-agri-high" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-agri-low" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const waterLabel = { low: "Drought-resistant", medium: "Moderate", high: "Water-intensive" };

export default function CropDetail() {
  const { cropName } = useParams();
  const crop = crops.find((c) => c.name.toLowerCase() === cropName?.toLowerCase());

  if (!crop) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Crop not found.</p>
        <Link to="/crops" className="text-primary text-sm mt-2 inline-block">← Back to crops</Link>
      </div>
    );
  }

  const demandSupplyHistory = monthLabels.map((m, i) => ({
    month: m,
    demand: crop.demandHistory[i],
    supply: crop.supplyHistory[i],
  }));

  const priceData = monthLabels.map((m, i) => ({
    month: m,
    price: crop.priceHistory[i],
  }));

  const scoreColor = crop.level === "high" ? "text-agri-high" : crop.level === "medium" ? "text-agri-medium" : "text-agri-low";
  const scoreBg = crop.level === "high" ? "bg-agri-high/10 border-agri-high/30" : crop.level === "medium" ? "bg-agri-medium/10 border-agri-medium/30" : "bg-agri-low/10 border-agri-low/30";

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Back nav */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Link to="/crops" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors active:scale-95">
          <ArrowLeft className="w-4 h-4" /> Back to Crops
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
              {crop.name}
            </h1>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              crop.recommendation === "Plant" ? "bg-agri-high/15 text-agri-high" :
              crop.recommendation === "Caution" ? "bg-agri-medium/15 text-agri-medium" :
              "bg-agri-low/15 text-agri-low"
            }`}>
              {crop.recommendation}
            </span>
          </div>
          <p className="text-muted-foreground">
            {crop.category} · {crop.growingSeason}
          </p>
        </div>
        <div className={`rounded-xl border px-6 py-4 ${scoreBg}`}>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono mb-1">Sync Score</p>
          <p className={`text-4xl font-bold font-mono ${scoreColor}`}>{crop.syncScore}</p>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { icon: TrendIcon, label: "Price Trend", value: `P${crop.pricePerKg.toFixed(1)}/kg`, extra: <TrendIcon trend={crop.trend} /> },
          { icon: Droplets, label: "Water Needs", value: waterLabel[crop.waterRequirement] },
          { icon: Clock, label: "Days to Harvest", value: `${crop.daysToHarvest} days` },
          { icon: Layers, label: "Yield/Hectare", value: `${crop.yieldPerHectare} t` },
        ].map((stat, i) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-foreground font-mono">{stat.value}</p>
              {stat.extra}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Demand capacity bar */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">Demand Capacity Remaining</h3>
            <p className="text-xs text-muted-foreground">
              How much additional supply the market can absorb before oversaturation
            </p>
          </div>
          <span className={`font-mono text-2xl font-bold ${crop.demandCapacityRemaining > 40 ? "text-agri-high" : crop.demandCapacityRemaining > 0 ? "text-agri-medium" : "text-agri-low"}`}>
            {crop.demandCapacityRemaining}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              crop.demandCapacityRemaining > 40 ? "bg-agri-high" : crop.demandCapacityRemaining > 0 ? "bg-agri-medium" : "bg-agri-low"
            }`}
            style={{ width: `${crop.demandCapacityRemaining}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {crop.demandCapacityRemaining > 40
            ? "Strong opportunity — market can absorb significantly more supply."
            : crop.demandCapacityRemaining > 0
            ? "Moderate opportunity — some room remains, proceed with caution."
            : "Market saturated — no remaining demand capacity. Risk of price crash."}
        </p>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-semibold text-foreground mb-1">Demand vs Supply Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">6-month projection (tonnes)</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandSupplyHistory} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 18% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(40 30% 99%)", border: "1px solid hsl(40 18% 88%)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="demand" name="Demand" fill="hsl(32 80% 50%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="supply" name="Supply" fill="hsl(160 45% 40%)" radius={[3, 3, 0, 0]} />
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
          <h3 className="font-semibold text-foreground mb-1">Price History</h3>
          <p className="text-xs text-muted-foreground mb-4">BWP per kilogram over 6 months</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 18% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `P${v}`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(40 30% 99%)", border: "1px solid hsl(40 18% 88%)", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => [`P${value.toFixed(1)}/kg`, "Price"]} />
                <Line type="monotone" dataKey="price" stroke="hsl(32 80% 50%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(32 80% 50%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Regional breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-semibold text-foreground mb-1">Regional Production</h3>
        <p className="text-xs text-muted-foreground mb-4">Current hectarage distribution across Botswana</p>
        <div className="space-y-3">
          {crop.regions.map((region) => (
            <div key={region.name} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-28 shrink-0">{region.name}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${region.percentage}%` }} />
              </div>
              <span className="font-mono text-xs text-muted-foreground w-20 text-right">
                {region.hectares.toLocaleString()} ha
              </span>
              <span className="font-mono text-xs text-muted-foreground w-10 text-right">
                {region.percentage}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
