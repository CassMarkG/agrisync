import { motion } from "framer-motion";
import { Lightbulb, ShieldAlert, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { crops } from "@/lib/cropData";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-agri-high" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-agri-low" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

export default function Recommendations() {
  const sorted = [...crops].sort((a, b) => b.syncScore - a.syncScore);
  const plant = sorted.filter((c) => c.recommendation === "Plant");
  const caution = sorted.filter((c) => c.recommendation === "Caution");
  const avoid = sorted.filter((c) => c.recommendation === "Avoid");

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
          Recommendations
        </h1>
        <p className="text-muted-foreground mt-1">
          Smart planting guidance based on national demand-supply analysis
        </p>
      </motion.div>

      {/* How dynamic allocation works */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">How Herd Effect Prevention Works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              As more farmers follow a recommendation, AgriSync dynamically reduces the remaining "demand capacity"
              for that crop. When capacity reaches zero, the crop shifts from <strong className="text-agri-high">Plant</strong> to{" "}
              <strong className="text-agri-medium">Caution</strong> and eventually to <strong className="text-agri-low">Avoid</strong>.
              This ensures farmers are coordinated without needing to know what others are planting.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Plant section */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-agri-high" />
          <h2 className="text-lg font-semibold text-foreground">Recommended to Plant</h2>
          <span className="text-xs text-muted-foreground font-mono">({plant.length} crops)</span>
        </div>
        <div className="space-y-3">
          {plant.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}
              className="rounded-xl border border-agri-high/20 bg-agri-high/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-[box-shadow] hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground text-lg">{crop.name}</h3>
                  <span className="font-mono text-sm font-bold text-agri-high">{crop.syncScore}</span>
                  <TrendIcon trend={crop.trend} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Demand: <strong className="text-foreground">{(crop.projectedDemand / 1000).toFixed(1)}k t</strong> ·
                  Supply: <strong className="text-foreground">{(crop.projectedSupply / 1000).toFixed(1)}k t</strong> ·
                  Gap: <strong className="text-agri-high">{((crop.projectedDemand - crop.projectedSupply) / 1000).toFixed(1)}k t</strong>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Demand capacity:</span>
                  <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-agri-high" style={{ width: `${crop.demandCapacityRemaining}%` }} />
                  </div>
                  <span className="font-mono text-xs text-agri-high">{crop.demandCapacityRemaining}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-foreground">P{crop.pricePerKg.toFixed(1)}/kg</p>
                  <p className="text-xs text-muted-foreground">{crop.category}</p>
                </div>
                <Link
                  to={`/crops/${crop.name.toLowerCase()}`}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-agri-high text-white text-xs font-semibold transition-[box-shadow,transform] hover:shadow-md active:scale-[0.97]"
                >
                  Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Caution section */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-agri-medium" />
          <h2 className="text-lg font-semibold text-foreground">Exercise Caution</h2>
          <span className="text-xs text-muted-foreground font-mono">({caution.length} crops)</span>
        </div>
        <div className="space-y-3">
          {caution.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease }}
              className="rounded-xl border border-agri-medium/20 bg-agri-medium/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-[box-shadow] hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">{crop.name}</h3>
                  <span className="font-mono text-sm font-bold text-agri-medium">{crop.syncScore}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supply is approaching demand. Monitor closely before committing.
                </p>
              </div>
              <Link
                to={`/crops/${crop.name.toLowerCase()}`}
                className="text-xs text-agri-medium hover:text-agri-medium/80 font-medium transition-colors active:scale-95 inline-flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Avoid section */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-agri-low" />
          <h2 className="text-lg font-semibold text-foreground">Avoid Planting</h2>
          <span className="text-xs text-muted-foreground font-mono">({avoid.length} crops)</span>
        </div>
        <div className="space-y-3">
          {avoid.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.06, ease }}
              className="rounded-xl border border-agri-low/20 bg-agri-low/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-[box-shadow] hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-foreground">{crop.name}</h3>
                  <span className="font-mono text-sm font-bold text-agri-low">{crop.syncScore}</span>
                  <TrendIcon trend={crop.trend} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Supply at <strong>{crop.currentSupply}%</strong> of demand. High risk of price drop — {crop.name.toLowerCase()} market is oversaturated.
                </p>
              </div>
              <Link
                to={`/crops/${crop.name.toLowerCase()}`}
                className="text-xs text-agri-low hover:text-agri-low/80 font-medium transition-colors active:scale-95 inline-flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
