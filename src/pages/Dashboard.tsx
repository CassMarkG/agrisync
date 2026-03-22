import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wheat, AlertTriangle, Users, Target } from "lucide-react";
import { crops, nationalMetrics } from "@/lib/cropData";
import SyncScoreCard from "@/components/SyncScoreCard";
import DemandSupplyChart from "@/components/DemandSupplyChart";

const ease = [0.16, 1, 0.3, 1] as const;

const metrics = [
  {
    label: "Average Sync Score",
    value: nationalMetrics.avgSyncScore,
    suffix: "/100",
    icon: Target,
    color: "text-primary",
  },
  {
    label: "Undersupplied Crops",
    value: nationalMetrics.undersuppliedCrops,
    suffix: " crops",
    icon: TrendingUp,
    color: "text-agri-high",
  },
  {
    label: "Oversupplied Crops",
    value: nationalMetrics.oversuppliedCrops,
    suffix: " crops",
    icon: AlertTriangle,
    color: "text-agri-low",
  },
  {
    label: "Farmers Connected",
    value: nationalMetrics.farmersConnected.toLocaleString(),
    suffix: "",
    icon: Users,
    color: "text-secondary",
  },
];

export default function Dashboard() {
  const sorted = [...crops].sort((a, b) => b.syncScore - a.syncScore);
  const topRecommendations = sorted.filter((c) => c.level === "high");
  const warnings = sorted.filter((c) => c.level === "low");

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          National crop sync overview · Season 2025/26
        </p>
      </motion.div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
            className="rounded-xl border border-border bg-card p-5 transition-[box-shadow] hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                {m.label}
              </span>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <p className={`text-2xl font-bold font-mono ${m.color}`}>
              {m.value}
              <span className="text-sm font-normal text-muted-foreground">{m.suffix}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Alerts */}
      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="rounded-xl border border-agri-low/30 bg-agri-low/5 p-5"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-agri-low shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Oversupply Alert</h3>
              <p className="text-sm text-muted-foreground">
                <strong>{warnings.map((w) => w.name).join(", ")}</strong> are projected to exceed
                demand this season. Farmers currently growing these crops may face price drops.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-1">Top Recommendations</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Crops with the highest opportunity based on demand-supply gap
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topRecommendations.map((crop, i) => (
            <SyncScoreCard key={crop.name} crop={crop} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        <DemandSupplyChart />
      </motion.div>

      {/* All crops */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.55, ease }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-1">All Tracked Crops</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Complete sync scores across all monitored crops
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((crop, i) => (
            <SyncScoreCard key={crop.name} crop={crop} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
