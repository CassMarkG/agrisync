import { motion } from "framer-motion";
import { Satellite, BarChart3, BrainCircuit, Sprout } from "lucide-react";

const steps = [
  {
    icon: BarChart3,
    title: "Aggregate demand data",
    desc: "National food consumption, import records, and market pricing data feed into a unified demand model.",
  },
  {
    icon: Satellite,
    title: "Scan current production",
    desc: "Satellite imagery detects what's currently being grown across Botswana's farmland in near real-time.",
  },
  {
    icon: BrainCircuit,
    title: "Calculate Sync Scores",
    desc: "An algorithm compares projected supply against demand to score each crop's market risk and opportunity.",
  },
  {
    icon: Sprout,
    title: "Recommend & coordinate",
    desc: "Farmers receive clear plant/avoid guidance, preventing herd behaviour and aligning supply with actual needs.",
  },
];

const ease = "easeInOut";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-agri-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-primary mb-3 block">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How AgriSync Works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-mono text-xs text-muted-foreground mb-2 block">
                0{i + 1}
              </span>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
