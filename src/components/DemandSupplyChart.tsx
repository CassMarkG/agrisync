import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { demandSupplyChartData } from "../lib/cropData";

export default function DemandSupplyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h3 className="font-semibold text-foreground mb-1">
        Projected Demand vs Supply
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Tonnes projected for upcoming season across tracked crops
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={demandSupplyChartData}
            margin={{ top: 0, right: 0, left: -16, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 18% 88%)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(40 30% 99%)",
                border: "1px solid hsl(40 18% 88%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value) => {
                if (typeof value === 'number') {
                  return [`${value.toLocaleString()} t`, undefined];
                }
                return [value, undefined];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
            <Bar
              dataKey="demand"
              name="Demand"
              fill="hsl(32 80% 50%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="supply"
              name="Supply"
              fill="hsl(160 45% 40%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
