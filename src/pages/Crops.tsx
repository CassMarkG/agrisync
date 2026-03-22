import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { crops } from "@/lib/cropData";
import { Link } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const levelBadge = {
  high: "bg-agri-high/15 text-agri-high",
  medium: "bg-agri-medium/15 text-agri-medium",
  low: "bg-agri-low/15 text-agri-low",
};

const recLabel = {
  Plant: "bg-agri-high/15 text-agri-high",
  Caution: "bg-agri-medium/15 text-agri-medium",
  Avoid: "bg-agri-low/15 text-agri-low",
};

type SortKey = "syncScore" | "name" | "pricePerKg" | "projectedDemand";

export default function Crops() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<SortKey>("syncScore");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = crops
    .filter((c) => {
      if (filter !== "all" && c.level !== filter) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortBy === "name") return mul * a.name.localeCompare(b.name);
      return mul * (a[sortBy] - b[sortBy]);
    });

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
          Crops
        </h1>
        <p className="text-muted-foreground mt-1">
          Explore all tracked crops with detailed market intelligence
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "high", "medium", "low"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-[box-shadow,background-color,transform] active:scale-[0.97] ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Crop <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  <button onClick={() => toggleSort("syncScore")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Sync Score <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Recommendation</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  <button onClick={() => toggleSort("pricePerKg")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Price/kg <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Supply Coverage</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  <button onClick={() => toggleSort("projectedDemand")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                    Demand <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crop, i) => (
                <motion.tr
                  key={crop.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-4 font-semibold text-foreground">{crop.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{crop.category}</td>
                  <td className="px-5 py-4">
                    <span className={`font-mono font-bold ${
                      crop.level === "high" ? "text-agri-high" : crop.level === "medium" ? "text-agri-medium" : "text-agri-low"
                    }`}>
                      {crop.syncScore}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${recLabel[crop.recommendation]}`}>
                      {crop.recommendation}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono">P{crop.pricePerKg.toFixed(1)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            crop.currentSupply > 100 ? "bg-agri-low" : crop.currentSupply > 70 ? "bg-agri-medium" : "bg-agri-high"
                          }`}
                          style={{ width: `${Math.min(crop.currentSupply, 150) / 1.5}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs">{crop.currentSupply}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs">{(crop.projectedDemand / 1000).toFixed(1)}k t</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/crops/${crop.name.toLowerCase()}`}
                      className="text-xs text-primary hover:text-primary/80 font-medium transition-colors active:scale-95"
                    >
                      View Details →
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p className="font-medium">No crops match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
