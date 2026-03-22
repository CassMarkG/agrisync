import { motion } from "framer-motion";
import { MapPin, Bell, Database, Shield } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your AgriSync experience
        </p>
      </motion.div>

      <div className="space-y-4">
        {[
          {
            icon: MapPin,
            title: "Region",
            desc: "Set your farming district for localized recommendations",
            value: "Central District",
          },
          {
            icon: Bell,
            title: "Notifications",
            desc: "Receive alerts when Sync Scores change significantly",
            value: "Enabled",
          },
          {
            icon: Database,
            title: "Data Sources",
            desc: "FAOSTAT, Copernicus, Google Earth Engine",
            value: "Connected",
          },
          {
            icon: Shield,
            title: "Privacy",
            desc: "Your planting data is anonymized and never shared individually",
            value: "Protected",
          },
        ].map((setting, i) => (
          <motion.div
            key={setting.title}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease }}
            className="rounded-xl border border-border bg-card p-5 flex items-center justify-between transition-[box-shadow] hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <setting.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{setting.title}</h3>
                <p className="text-xs text-muted-foreground">{setting.desc}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{setting.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
