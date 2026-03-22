import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CropData } from "../lib/cropData";

const levelStyles = {
  high: "border-agri-high/30 bg-agri-high/5",
  medium: "border-agri-medium/30 bg-agri-medium/5",
  low: "border-agri-low/30 bg-agri-low/5",
};

const scoreColor = {
  high: "text-agri-high",
  medium: "text-agri-medium",
  low: "text-agri-low",
};

const recBadge = {
  Plant: "bg-agri-high/15 text-agri-high",
  Caution: "bg-agri-medium/15 text-agri-medium",
  Avoid: "bg-agri-low/15 text-agri-low",
};

const TrendIcon = ({ trend }: { trend: CropData["trend"] }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-agri-high" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-agri-low" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

export default function SyncScoreCard({ crop, index }: { crop: CropData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-xl border p-5 transition-[box-shadow] hover:shadow-md ${levelStyles[crop.level]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{crop.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendIcon trend={crop.trend} />
            <span className="text-xs text-muted-foreground">P{crop.pricePerKg.toFixed(1)}/kg</span>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold font-mono ${scoreColor[crop.level]}`}>
            {crop.syncScore}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Sync</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Supply coverage</span>
          <span className="font-mono font-medium">{crop.currentSupply}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              crop.currentSupply > 100 ? "bg-agri-low" : crop.currentSupply > 70 ? "bg-agri-medium" : "bg-agri-high"
            }`}
            style={{ width: `${Math.min(crop.currentSupply, 150) / 1.5}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${recBadge[crop.recommendation]}`}>
          {crop.recommendation}
        </span>
        <Link to={`/crops/${crop.name.toLowerCase()}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 active:scale-95">
          Details <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
