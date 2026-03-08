import { motion } from "framer-motion";

const FloatingDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mt-16 max-w-3xl mx-auto"
      style={{ perspective: "1000px" }}
    >
      <div className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-card overflow-hidden">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
          <div className="flex-1 text-center">
            <span className="text-[10px] text-muted-foreground/50 font-mono">nexbuildlabs.com/dashboard</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {/* Metric cards */}
          {[
            { label: "Organic Traffic", value: "24.8K", change: "+23%", up: true },
            { label: "Conversions", value: "1,247", change: "+18%", up: true },
            { label: "Revenue", value: "$84.2K", change: "+31%", up: true },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              className="bg-background/50 rounded-xl p-4 border border-border/30"
            >
              <div className="text-[10px] text-muted-foreground mb-1">{metric.label}</div>
              <div className="font-heading font-bold text-lg">{metric.value}</div>
              <div className="text-[10px] text-green-500 font-medium">{metric.change}</div>
            </motion.div>
          ))}

          {/* Chart area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="col-span-2 bg-background/50 rounded-xl p-4 border border-border/30"
          >
            <div className="text-[10px] text-muted-foreground mb-3">Growth Trend</div>
            <div className="flex items-end gap-1.5 h-20">
              {[30, 45, 35, 55, 42, 65, 58, 72, 68, 85, 78, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 1.7 + i * 0.05, ease: "easeOut" }}
                  className="flex-1 rounded-sm bg-gradient-primary opacity-70"
                />
              ))}
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="bg-background/50 rounded-xl p-4 border border-border/30"
          >
            <div className="text-[10px] text-muted-foreground mb-3">Channels</div>
            <div className="space-y-2">
              {[
                { name: "Organic", pct: 42 },
                { name: "Paid", pct: 31 },
                { name: "Social", pct: 18 },
                { name: "Direct", pct: 9 },
              ].map((ch) => (
                <div key={ch.name}>
                  <div className="flex justify-between text-[9px] text-muted-foreground mb-0.5">
                    <span>{ch.name}</span>
                    <span>{ch.pct}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-border/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.pct}%` }}
                      transition={{ duration: 0.8, delay: 1.8 }}
                      className="h-full rounded-full bg-gradient-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glow underneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-electric/15 blur-3xl rounded-full" />
    </motion.div>
  );
};

export default FloatingDashboard;
