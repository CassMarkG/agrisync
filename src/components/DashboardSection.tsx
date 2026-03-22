import { motion } from "framer-motion";
import SyncScoreCard from "./SyncScoreCard";
import DemandSupplyChart from "./DemandSupplyChart";
import { crops } from "../lib/cropData";


export default function DashboardSection() {
  const sorted = [...crops].sort((a, b) => b.syncScore - a.syncScore);

  return (
    <section id="dashboard" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-primary mb-3 block">
            Live Sync Scores
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            What should you plant this season?
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Higher scores mean higher opportunity—crops where demand outstrips
            projected supply. Lower scores signal oversupply risk.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sorted.map((crop, i) => (
            <SyncScoreCard key={crop.name} crop={crop} index={i} />
          ))}
        </div>

        <DemandSupplyChart />
      </div>
    </section>
  );
}
