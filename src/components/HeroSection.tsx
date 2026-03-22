import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-satellite.jpg";

const ease = "easeInOut";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Satellite view of Botswana farmland"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="container relative z-10 py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-block font-mono text-sm tracking-wider uppercase text-primary mb-6">
              Predictive Crop Intelligence
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Know what to plant
            <br />
            before you plant it.
          </motion.h1>

          <motion.p
            className="text-lg text-primary-foreground/75 max-w-lg mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            AgriSync combines national demand data with satellite imagery to
            predict oversupply before it happens—helping Botswana's farmers
            grow what the market actually needs.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-[box-shadow,transform] hover:shadow-lg hover:shadow-primary/25 active:scale-[0.97]"
            >
              I'm a Farmer
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm transition-[box-shadow,transform] hover:shadow-lg hover:shadow-secondary/25 active:scale-[0.97]"
            >
              I'm a Buyer
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-primary-foreground/25 text-primary-foreground font-medium text-sm transition-[box-shadow,transform] hover:bg-primary-foreground/10 active:scale-[0.97]"
            >
              How It Works
            </a>
          </motion.div>
        </div>

        {/* Live stats strip */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          {[
            { value: "12", label: "Crops tracked" },
            { value: "3.2k", label: "Farmers synced" },
            { value: "87%", label: "Forecast accuracy" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold font-mono text-primary">
                {stat.value}
              </p>
              <p className="text-xs text-primary-foreground/50 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
